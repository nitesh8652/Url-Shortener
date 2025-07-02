import React from 'react';
import { Link } from '@tanstack/react-router';
import { LogIn, LogOut } from 'lucide-react';
import {auth} from '../Store/Slice/AuthSlice.js'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from '@tanstack/react-router';

const Navbar = () => {

    const auth = useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();

const handleLogout = async () => {
    try{
        await LogoutUser();
    } catch (err){
        console.warn('Server-side logout failed, clearing client only');
    } finally {
        dispatch(logout());
        navigate({to:'/'})
    }
}

    return (
        <nav className="bg-white shadow-sm py-3 px-4">
            <div className="container mx-auto flex justify-between items-center">

                <Link to="/" className="text-[18px] font-semibold text-blue-600">
                    URL Shortener
                </Link>



                {/* <div className="loginbutt bg-blue-500 px-[7px] py-[7px] rounded-[7px] hover:bg-blue-300  hover:text-blue-600"> */}

                {/* Right side - Login button */}
                {/* <Link
                        to="/loginpage"
                        className="flex items-center gap-1 text-[14px] text-white hover:text-blue-600 transition-colors"
                    >
                        <LogIn size={18} />
                        <span>Login</span>
                    </Link> */}

                {!auth.user ? (
                    <div className="loginbutt bg-blue-500 px-[7px] py-[7px] rounded-[7px] hover:bg-blue-300 hover:text-blue-600">
                        <Link
                            to="/loginpage"
                            className="flex items-center gap-1 text-[14px] text-white hover:text-blue-600 transition-colors"
                        >
                            <LogIn size={18} />
                            <span>Login</span>
                        </Link>
                    </div>
                    ) : (
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                )}

                {/* // </div > */}

                <Link
                    to="/qrgenerate"
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >Generate QR</Link>

                {/* <Link
                to="/logout"
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >Logout</Link> */}

            </div>
        </nav>
    );
};

export default Navbar;