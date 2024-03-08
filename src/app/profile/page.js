"use client"
import axios from "axios"
import Link from "next/link"
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Profile(){
    const router = useRouter()

    const signout = async () => {
        try{
            await axios.get("/api/users/signout");
            toast.success('Signout Sucessfully');
            router.push('/signin');
        }catch(error){
            console.log(error.message);
            toast.error(error.message);
        }
    }
    return(
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p className="text-4xl">Profile page</p>
            <hr/>
            <button 
                onClick={signout}
                className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>
        </div>
    )
}