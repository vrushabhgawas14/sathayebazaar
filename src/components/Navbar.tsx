"use client";

import { hamburgerMenu, NavElementDetails } from "@/constants/NavbarDetails";
import Link from "next/link";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Button from "./Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  let hamburger = hamburgerMenu.bar;

  hamburger = isOpen ? hamburgerMenu.cross : hamburgerMenu.bar;
  const isLoggedIn = session ? true : false;

  return (
    <>
      <div className="relative h-28">
        <nav className="flex items-center lg:justify-around justify-between fixed top-0 w-full font-semibold z-10 text-white bgGradientLarge sm:bg-gradient-left text-lg sm:text-2xl py-6 md:px-4 sm:p-6">
          <div className="text-center font-bold text-4xl border-y-Border-slate border-y-2 border-x-0 rounded-tr-3xl rounded-bl-3xl pt-2 px-4 lg:mx-4 sm:text-3xl sm:w-auto lg:w-[30%]">
            <Link href="/">Athawda Bazaar</Link>
          </div>
          <div
            className={`flex items-center py-2 lg:justify-evenly lg:w-[70%] ${
              isOpen ? "toggleNav" : "sm:hidden md:hidden"
            }`}
            onClick={() => setIsOpen(false)}
          >
            <div
              className={`${
                isOpen && "flex flex-col items-center space-y-4 pb-2"
              } lg:space-x-10`}
            >
              {NavElementDetails.map((item, index) => (
                <Link
                  key={index}
                  href={item.url}
                  className="border-2 border-transparent hover:border-b-gray-200 sm:border-none"
                >
                  {item.text}
                </Link>
              ))}
            </div>
            <div>
              {isLoggedIn ? (
                <div className="flex">
                  <Button text="Profile" url="/profile" />
                </div>
              ) : (
                <div className="flex space-x-4">
                  <Button text="Login" url="/login" />
                  <Button text="Register" url="/register" />
                </div>
              )}
            </div>
          </div>

          {/* Hamburger Menu */}
          <div className="lg:hidden sm:w-auto">
            <button
              className="w-6 h-6"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Hamburger Menu"
            >
              {hamburger}
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
