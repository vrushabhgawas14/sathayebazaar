"use client";

import { hamburgerMenu, NavElementDetails } from "@/constants/NavbarDetails";
import Link from "next/link";
import { useEffect, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Button from "./Button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [pageScrolling, setPageScrolling] = useState(false);
  const { data: session } = useSession();
  let hamburger = hamburgerMenu.bar;

  hamburger = isOpen ? hamburgerMenu.cross : hamburgerMenu.bar;
  const isLoggedIn = session ? true : false;

  const trackScroll = () => {
    setPageScrolling(window.scrollY >= 100 ? true : false);
  };

  useEffect(() => {
    window.addEventListener("scroll", trackScroll);
  }, []);

  return (
    <>
      <div className="relative h-28">
        <nav
          className={`flex items-center lg:justify-around fixed top-0 w-full text-lg sm:text-2xl font-semibold py-6 z-10 text-white md:px-4 sm:p-6 justify-between
          ${
            pageScrolling
              ? "bg-slate-900 ease-in duration-500"
              : "ease-out duration-500"
          }`}
        >
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
                  className="border-2 border-transparent hover:border-b-Border-slate sm:border-none"
                >
                  {item.text}
                </Link>
              ))}
            </div>
            <div>
              {isLoggedIn ? (
                <div className="flex lg:space-x-4 md:flex-col md:space-y-4 sm:flex-col sm:space-y-4">
                  <Button text="Profile" url="/profile" />
                  <Button text="LogOut" url="/" onClick={signOut} />
                </div>
              ) : (
                <div className="space-x-4">
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
