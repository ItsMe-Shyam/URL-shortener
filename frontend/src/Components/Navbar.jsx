import React, { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Navbar() {
    const { isAuthenticated } = useSelector((state) => state.auth);

    useEffect

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
                    Shortly
                </Link>

                {/* Right Section */}
                {
                    !isAuthenticated ? (
                        <div className="space-x-4">
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-lg font-medium transition ${
                                        isActive
                                            ? 'bg-blue-600 text-white'
                                            : 'text-blue-600 hover:bg-blue-100'
                                    }`
                                }
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/signup"
                                className={({ isActive }) =>
                                    `px-4 py-2 rounded-lg font-medium transition ${
                                        isActive
                                            ? 'bg-indigo-600 text-white'
                                            : 'text-indigo-600 hover:bg-indigo-100'
                                    }`
                                }
                            >
                                Sign Up
                            </NavLink>
                        </div>
                    ) : (
                        <h1 className="text-lg font-semibold text-gray-700">Welcome!</h1>
                    )
                }

                {/* Optional Mobile Menu Button */}
                {/* 
                <div className="md:hidden">
                    <button
                        type="button"
                        aria-label="Toggle menu"
                        className="text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
                */}
            </div>
        </nav>
    );
}
