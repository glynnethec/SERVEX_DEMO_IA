"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const handleResize = () => setIsMobile(window.innerWidth < 800);
    window.addEventListener("resize", handleResize);

    handleScroll();
    handleResize();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const currentLogo = scrolled ? "/logo3.png" : "/logo.png";

  const navLinks = (
    <>
      <span
        onClick={() => {
          setMenuOpen(false);
          router.push("/model");
        }}
        className="cursor-pointer text-sm font-medium text-black hover:text-gray-800 transition-all"
      >
        Model 
      </span>

      <span
        onClick={() => {
          setMenuOpen(false);
          router.push("https://servex-us.com/");
        }}
        className="cursor-pointer text-sm font-medium text-black hover:text-gray-800 transition-all"
      >
         Servex US
      </span>
    </>
  );

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-all duration-500 px-4 md:px-6 py-2 flex items-center justify-between h-14 ${
          scrolled ? "bg-white/10 shadow-sm" : "bg-transparent"
        }`}
      >
        <img
          src={currentLogo}
          alt="Logo"
          className="h-10 cursor-pointer transition-all duration-500"
          onClick={() => router.push("/")}
        />

        <div className="hidden md:flex items-center gap-6">{navLinks}</div>

        {isMobile && (
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-black"
          >
            {menuOpen ? "✕" : "≡"}
          </button>
        )}
      </header>

      {menuOpen && isMobile && (
        <div
          className={`fixed top-14 left-0 w-full z-50 flex flex-col items-center gap-4 backdrop-blur-md rounded-b-2xl transition-all duration-500 bg-white/10 shadow-sm`}
        >
          {navLinks}
        </div>
      )}
    </>
  );
}
