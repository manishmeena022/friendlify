const { connect } = require("@/libs/mongoConnect");
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request) {
    try{
        const body = await request.json();
        const {email, password} = body;
        console.log(body);

        //Check if user exists
        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({ error : "User does not exits"}, { status : 400 });
        }

        //check if password is correct 
        const validatePassword = await bcrypt.compare(password, user.password);

        if(!validatePassword){
            return NextResponse.json({ error : "Invalid password"}, {status : 400});
        }

        //create token data
        const tokenData = {
            id : user._id,
            fullname : user.fullname,
            username : user.username,
            email : user.email
        }

        //create token
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn : "1d"})

        const response = NextResponse.json({
            message : "Login successful",
            success : true,
        })
        response.cookies.set("token", token, {
            httpOnly : true,
        })

        return response;

    }catch(error){
        return NextResponse.json({ error : error.message},{status : 500}) 
    }
}