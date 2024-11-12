"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { HiMenu } from "react-icons/hi"; // Icono de menú hamburguesa

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-white border-black text-black p-6 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div className="logo">
          <Link href="/">
            <Image
              className=""
              src="/lacsa_logo.jpg"
              width={60} 
              height={60}
              alt="Lacsa logo"
            />
          </Link>
        </div>
        <div className="hidden md:flex gap-6">
          <Link href="/login" className="hover:text-gray-600">
            Login
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            <HiMenu className="text-3xl" />
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col items-start mt-4 space-y-2 md:hidden">
          <Link href='/login' onClick={toggleMenu} className="hover:text-gray-600">Login</Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;