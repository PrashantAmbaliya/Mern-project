import React from 'react'

function AdminLogin() {
  return (
    <main className='w-full h-screen flex items-center justify-center'>
    <div className='w-[400px] gap-4 h-[300px] flex flex-col items-center justify-center p-4 rounded-md bg-slate-300'>
        <h1 className='text-4xl font-bold'>Admin Sign Up</h1>
        <form onSubmit={HandleSubmit} className=' w-[80%] flex flex-col gap-3'>
            <input value={username} onChange={(e) => setUsername(e.target.value)} className='p-2 rounded-md' type="text" name="username" placeholder='Username' required />
            <input value={email} onChange={(e) => setEmail(e.target.value)} className='p-2 rounded-md' type="email" name="email" placeholder='email' required />
            <input value={password} onChange={(e) => setPassword(e.target.value)} className='p-2 rounded-md' type="password" name="password" placeholder='password' required />
            <button type='submit' className='p-2 bg-blue-600 rounded-md'>
                Register
            </button>
        </form>
    </div>
</main>
  )
}

export default AdminLogin