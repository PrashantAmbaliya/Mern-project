import React, { useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function HandleSubmit(e) {
        e.preventDefault();

        fetch("http://localhost:8500/user/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ email, password })
        }).then((res) => {
            if (res.status !== 200) {
                console.log(res.status);
                return navigate("/signup");
            }
            return res.json();
        }).then((res) => {
            toast.success("You are logged In")
            localStorage.setItem('Token', res.token);
            navigate("/");
        }).catch((err) => {
            console.log(err);
            return navigate("/signup");
        });
    }

    return (
        <>
            <Navbar />
            <main className='w-full h-screen flex items-center justify-center'>
                <div className='w-[400px] gap-4 flex flex-col items-center justify-center p-4 rounded-md bg-slate-300'>
                    <h1 className='text-4xl font-bold'>Login</h1>
                    <form onSubmit={HandleSubmit} className=' w-[80%] flex flex-col gap-3'>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className='p-2 rounded-md' type="email" name="email" placeholder='email' required />
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className='p-2 rounded-md' type="password" name="password" placeholder='password' required />
                        <button type='submit' className='p-2 bg-blue-600 rounded-md'>
                            Login
                        </button>
                    </form>
                    <h3 className='text-white mt-3'>New here? <a href='/signup' className='text-blue-700 hover:text-blue-500 transition ease-in-out delay-80'>Create Account</a></h3>
                </div>
            </main>
        </>
    );
}

export default Login;
