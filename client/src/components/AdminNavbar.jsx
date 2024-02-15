import React from 'react';
import { Link } from 'react-router-dom';

function AdminNavbar() {
    return (
        <nav className="bg-gray-900 p-4 flex justify-between items-center">
            <div className="text-white text-xl font-bold">Admin Panel</div>
            <ul className="flex">
                <li className="mr-6">
                    <Link to="/admin/dashboard" className="text-white hover:text-gray-300">Dashboard</Link>
                </li>
                <li className="mr-6">
                    <Link to="/admin/products" className="text-white hover:text-gray-300">Add Products</Link>
                </li>
                <li className="mr-6">
                    <Link to="/admin/orders" className="text-white hover:text-gray-300">Orders</Link>
                </li>
            </ul>
        </nav>
    );
}

export default AdminNavbar;
