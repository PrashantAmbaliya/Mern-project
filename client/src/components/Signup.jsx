import React, { useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Signup() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function HandleSubmit(e) {
        e.preventDefault();
        console.log(email, password, username);

        fetch("http://localhost:8500/user/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ username, email, password })
        }).then((res) => {
            if (res.status !== 200) {
                throw new Error('Failed to register');
            }
            toast.success("signed Up") 
            navigate("/");
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <>
            <Navbar />
            <main className='w-full h-screen flex items-center justify-center'>
                <div className='w-[400px] gap-4 flex flex-col items-center justify-center p-4 rounded-md bg-slate-300'>
                    <h1 className='text-4xl font-bold'>Sign Up</h1>
                    <form onSubmit={HandleSubmit} className=' w-[80%] flex flex-col gap-3'>
                        <input value={username} onChange={(e) => setUsername(e.target.value)} className='border-2 border-gray-100  text-black shadow-lg p-2 rounded-lg focus:outline-none autofocus' type="text" name="username" placeholder='Username' required />
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className='border-2 border-gray-100  text-black shadow-lg p-2 rounded-lg focus:outline-none autofocus' type="email" name="email" placeholder='email' required />
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className='border-2 border-gray-100  text-black shadow-lg p-2 rounded-lg focus:outline-none autofocus' type="password" name="password" placeholder='password' required />
                        <button type='submit' className='p-2 bg-blue-600 rounded-md'>
                            Register
                        </button>
                    </form>
                    <h3 className='text-white mt-3'>Already Have Account? <a href='/login' className='text-blue-500 hover:text-blue-300 transition ease-in-out delay-80'>Login</a></h3>
                </div>
            </main>
        </>
    );
}

export default Signup;
