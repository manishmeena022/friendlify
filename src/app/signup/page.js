"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";


export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        fullname : "",
        email: "",
        password: "",
        username: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/signin");
            
        } catch (error) {
            console.log("Signup failed", error.message);
            
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return  (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl font-bold mb-4">{loading ? 'Processing' : 'Signup'}</h1>
            <hr className="w-1/3 mb-8" />
            <div className="flex flex-col w-1/2">
                <label className="text-lg font-semibold" htmlFor="fullname">
                    Full Name
                </label>
                <input
                    className="input-field text-black"
                    id="fullname"
                    type="text"
                    value={user.fullname}
                    onChange={(e) => setUser({ ...user, fullname: e.target.value })}
                    placeholder="Enter your full name"
                />
                <label className="text-lg font-semibold" htmlFor="username">
                    Username
                </label>
                <input
                    className="input-field text-black"
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="Enter your username"
                />
                <label className="text-lg font-semibold" htmlFor="email">
                    Email
                </label>
                <input
                    className="input-field text-black"
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Enter your email"
                />
                <label className="text-lg font-semibold" htmlFor="password">
                    Password
                </label>
                <input
                    className="input-field text-black"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Enter your password"
                />
                <button
                    onClick={onSignup}
                    className="btn-primary"
                >
                    {loading ? 'Signing up...' : 'Signup'}
                </button>
                <p className="mt-4">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-600">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
}