import React from 'react';
import { Link } from '@tanstack/react-router';
import { LogIn } from 'lucide-react';



const Navbar = () => {
    return (
        <nav className="bg-white shadow-sm py-3 px-4">
            <div className="container mx-auto flex justify-between items-center">

                <Link to="/" className="text-[18px] font-semibold text-blue-600">
                    URL Shortener
                </Link>



                <div className="loginbutt bg-blue-500 px-[7px] py-[7px] rounded-[7px] hover:bg-blue-300  hover:text-blue-600">

                    {/* Right side - Login button */}
                    <Link
                        to="/loginpage"
                        className="flex items-center gap-1 text-[14px] text-white hover:text-blue-600 transition-colors"
                    >
                        <LogIn size={18} />
                        <span>Login</span>
                    </Link>
                </div >

                <Link
                    to="/generateqr"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >Generate QR</Link>
            </div>
        </nav>
    );
};

export default Navbar;