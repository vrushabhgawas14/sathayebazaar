"use client";

import { hamburgerMenu, NavElementDetails } from "@/constants/NavbarDetails";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoginRegister from "./LoginRegisterButton";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [pageScrolling, setPageScrolling] = useState(false);
  let hamburger = hamburgerMenu.bar;

  hamburger = isOpen ? hamburgerMenu.cross : hamburgerMenu.bar;

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
          className={`flex items-center justify-around fixed top-0 w-full text-lg sm:text-2xl font-semibold py-6 z-10 text-white md:px-8 sm:p-6 sm:justify-between
          ${
            pageScrolling
              ? "bg-slate-900 ease-in duration-500"
              : "ease-out duration-500"
          }`}
        >
          <div className="text-center font-bold text-4xl border-y-Border-slate border-y-2 border-x-0 rounded-tr-3xl rounded-bl-3xl pt-2 px-4 sm:text-3xl sm:w-auto">
            <Link href="/">Jugaadu</Link>
          </div>

          <div
            className={`flex items-center justify-evenly py-2 ${
              isOpen ? "toggleNav" : "sm:hidden"
            }`}
          >
            {NavElementDetails.map((item, index) => (
              <Link
                key={index}
                href={item.url}
                onClick={() => setIsOpen(false)}
                className="mx-10 md:mx-3 border-2 border-transparent hover:border-b-Border-slate sm:border-none"
              >
                {item.text}
              </Link>
            ))}
            {isOpen && <LoginRegister />}
          </div>
          <LoginRegister ClassName="sm:hidden" />
          {/* Hamburger Menu */}
          <div className="hidden sm:block sm:w-auto">
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
