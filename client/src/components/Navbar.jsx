import React from 'react'
import { Link } from 'react-router-dom';
import { FaShoppingCart } from "react-icons/fa";

function Navbar() {
    return (
        <nav className='w-full bg-blue-500'>
            <div className='max-w-screen-xl flex mx-auto item-center justify-between items-center p-2'>
                <div>
                    <h1 className='text-4xl font-bold'>Shopie</h1>
                </div>
                <div className='text-sm'>
                    <ul className='flex gap-4 justify-between items-center text-white'>
                        <li className='text-2xl font-bold hover:bg-blue-700 ease-in-out p-2 rounded-full'>
                            <Link to="/">
                                Home
                            </Link>
                        </li>
                        <li className=' hover:bg-blue-700 ease-in-out p-3 rounded-full'>
                            <Link to="/cart">
                                <FaShoppingCart className='text-xl'/>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar