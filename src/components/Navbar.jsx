import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Shield, ShoppingCart, X } from 'lucide-react';
import { gsap } from 'gsap';
import { useSelector } from "react-redux";
import { selectCartLength } from '../Store/CartSlice';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const logoRef = useRef(null);
    const linksRef = useRef([]);
    const buttonsRef = useRef([]);

    // ✅ Use Redux selector correctly
    const length = useSelector(selectCartLength);

    useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.6 } });

        tl.from(logoRef.current, { y: -50, opacity: 0 })
            .from(linksRef.current, {
                y: -50,
                opacity: 0,
                stagger: 0.1
            }, "-=0.4")
            .from(buttonsRef.current, {
                y: -50,
                opacity: 0,
                stagger: 0.1
            }, "-=0.4");

    }, []);

    return (
        <nav className="font-anton text-xl py-4 px-2 sm:px-0 h-[60px] w-full sm:w-[90%] mx-auto flex justify-between items-center bg-white sticky top-0 z-50">

            {/* Logo */}
            <div ref={logoRef}>
                <Link to="/" className="text-2xl font-bold flex items-center">
                    <Shield className='mr-2' />
                    <div className='font-anton text-xl'>MemeFits</div>
                </Link>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden sm:flex font-sans font-light text-[18px]">
                <ul className="flex gap-6">
                    {['Home', 'Shop', 'Policy'].map((text, idx) => (
                        <li key={idx} className="relative group">
                            <Link
                                ref={el => linksRef.current[idx] = el}
                                to={`/${text.toLowerCase() === 'home' ? '' : text.toLowerCase()}`}
                                className="text-lg hover:font-medium transition-colors duration-300"
                            >
                                {text}
                                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-blue-500 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Auth Buttons & Cart (Desktop) */}
            
            <div className="hidden sm:flex gap-3 items-center text-[16px]">
                {/* Cart icon only if length > 0 */}
                {(<Link to={'/cart'}>
                    <div className="relative cursor-pointer">
                        <ShoppingCart  className="text-2xl text-black hover:text-blue-600 transition-all" />
                        {
                            length > 0 && <span className="absolute top-[-10px] right-[-10px] bg-blue-500 text-white text-sm w-5 h-5 rounded-full flex items-center justify-center">{length}</span>
                        }
                        
                    </div>
                    </Link>
                )}

                {['Login', 'Signup'].map((text, idx) => (
                    <button
                        key={idx}
                        ref={el => buttonsRef.current[idx] = el}
                        className="px-4 py-2 border border-black text-black bg-white hover:bg-black hover:text-white transition-colors duration-300 ease-in-out"
                    >
                        {text}
                    </button>
                ))}
            </div>

            {/* Mobile Menu Icon */}
            <div className="sm:hidden flex items-center gap-5">
                {(<Link to={'/cart'}>
                    <div className="relative cursor-pointer">
                        <ShoppingCart  className="text-2xl text-black hover:text-blue-600 transition-all" />
                        {
                            length > 0 && <span className="absolute top-[-10px] right-[-10px] bg-blue-500 text-white text-sm w-5 h-5 rounded-full flex items-center justify-center">{length}</span>
                        }
                        
                    </div>
                    </Link>
                )}
                <button onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            <div
                className={`absolute top-[100%] left-0 w-full flex flex-col items-center py-4 gap-4 shadow-md sm:hidden z-40 
                transform transition-all duration-300 ease-in-out origin-top bg-white  ${isOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
                    }`}
            >
                {['Home', 'Shop', 'Policy'].map((text, idx) => (
                    <Link
                        key={idx}
                        to={`/${text.toLowerCase() === 'home' ? '' : text.toLowerCase()}`}
                        className="text-lg font-sans hover:text-blue-500"
                        onClick={() => setIsOpen(false)}
                    >
                        {text}
                    </Link>
                ))}

                <div className="flex gap-3 mt-2 items-center">
                    

                    <button className="px-4 py-2 cursor-pointer border border-black text-black bg-white hover:bg-black hover:text-white transition-all">
                        Login
                    </button>
                    <button className="px-4 py-2 cursor-pointer border border-black text-black bg-white hover:bg-black hover:text-white transition-all">
                        Signup
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
