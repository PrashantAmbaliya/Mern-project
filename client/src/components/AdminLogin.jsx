import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function HandleSubmit(e) {
        e.preventDefault()

        fetch("http://localhost:8500/admin/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ email, password })
        }).then((res) => {
            if (res.status !== 200) {
                return navigate("/admin/login");
            }
            return res.json()
        }).then((res) => {
            console.log(res);
            localStorage.setItem('AdminToken', res.adminToken);
            navigate("/admin/dashboard")
        })
            .catch((err) => {
                console.log(err);
                return navigate("/admin/login");
            })
    }
    return (
        <main className='w-full h-screen flex items-center justify-center'>
            <div className='w-[400px] gap-4 h-[300px] flex flex-col items-center justify-center p-4 rounded-md bg-slate-300'>
                <h1 className='text-4xl font-bold'>Admin Login</h1>
                <form onSubmit={HandleSubmit} className=' w-[80%] flex flex-col gap-3'>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} className='p-2 rounded-md' type="email" name="email" placeholder='email' required />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} className='p-2 rounded-md' type="password" name="password" placeholder='password' required />
                    <button type='submit' className='p-2 bg-blue-600 rounded-md'>
                        Login As Admin
                    </button>
                </form>
            </div>
        </main>
    )
}

export default AdminLogin