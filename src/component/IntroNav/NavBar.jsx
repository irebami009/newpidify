import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    // NavBar
    <div>
      {/* navbar */}
      <nav className="w-full top-0 px-4 sm:px-6 md:px-8 lg:px-12 py-3 sm:py-4 shadow-lg bg-white sticky z-50">
        {/* nav-container */}
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-1 sm:gap-2">
            <img className="w-6 sm:w-8" src="/Images/logo.png" alt="Logo" />
            <span className="text-lg sm:text-2xl lg:text-3xl font-bold text-[#006666]">Pdify</span>
          </div>

          {/* Desktop links */}
          <div className="hidden md:flex gap-4 lg:gap-7 text-black font-bold">
            <a className="text-sm lg:text-base hover:text-[#006666] transition-colors duration-300" href="/">Resources</a>
            <a className="text-sm lg:text-base hover:text-[#006666] transition-colors duration-300" href="/past-questions">Past Questions</a>
            <a className="text-sm lg:text-base hover:text-[#006666] transition-colors duration-300" href="/quiz">Quiz</a>
          </div>

          {/* Desktop buttons */}
          <div className="hidden md:flex items-center gap-3 lg:gap-6 font-bold">
            <a className="text-[#006666] border-2 border-[#006666] rounded-full px-3 py-2 lg:px-4 lg:py-3 text-sm lg:text-base hover:bg-[#006666] hover:text-white transition-colors" href="/login">Log in</a>
            <a className="text-white bg-[#006666] rounded-full px-4 py-2 lg:px-5 lg:py-3 text-sm lg:text-base hover:bg-[#004d4d] transition-colors" href="/register">Sign up</a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-[#006666] p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="flex flex-col gap-3 mt-3">
              <a className="text-sm font-bold text-black hover:text-[#006666] transition-colors" href="/">Resources</a>
              <a className="text-sm font-bold text-black hover:text-[#006666] transition-colors" href="/past-questions">Past Questions</a>
              <a className="text-sm font-bold text-black hover:text-[#006666] transition-colors" href="/quiz">Quiz</a>
              <hr className="my-2" />
              <a className="text-sm font-bold text-[#006666] border border-[#006666] rounded-full px-4 py-2 text-center hover:bg-[#006666] hover:text-white transition-colors" href="/login">Log in</a>
              <a className="text-sm font-bold text-white bg-[#006666] rounded-full px-4 py-2 text-center hover:bg-[#004d4d] transition-colors" href="/register">Sign up</a>
            </div>
          </div>
        )}
      </nav>
      {/* end of navbar */}
    </div>
  );
};

export default NavBar;
