import React, { useState } from 'react';
import { BookOpen, Menu, Search, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const navLinks = [
    { label: 'Resources', path: '/' },
    { label: 'Past Questions', path: '/past-questions' },
    { label: 'Quiz', path: '/quiz' },
  ];

  const isActive = (path) => pathname === path;

  return (
    <div className="sticky top-0 z-50 border-b border-[#dbe9e7] bg-white/90 backdrop-blur-xl">
      <nav className="w-full px-4 py-3 sm:px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#006666] text-white shadow-sm">
              <BookOpen size={21} />
            </span>
            <span className="text-xl font-black text-[#0e2929] sm:text-2xl">PDIFY</span>
          </Link>

          <div className="hidden items-center gap-2 rounded-full border border-[#d8e7e5] bg-[#f7fbfa] p-1 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive(link.path)
                    ? 'bg-white text-[#006666] shadow-sm'
                    : 'text-[#445b5b] hover:text-[#006666]'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              className="rounded-full border border-[#b9d4d0] px-4 py-2 text-sm font-bold text-[#006666] transition hover:border-[#006666] hover:bg-[#edf8f6]"
              to="/login"
            >
              Log in
            </Link>
            <Link
              className="rounded-full bg-[#006666] px-5 py-2 text-sm font-bold text-white shadow-lg shadow-[#006666]/20 transition hover:bg-[#004f4f]"
              to="/register"
            >
              Sign up
            </Link>
          </div>

          <button
            className="rounded-lg border border-[#d8e7e5] p-2 text-[#006666] md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="mx-auto mt-3 max-w-7xl rounded-xl border border-[#d8e7e5] bg-white p-3 shadow-xl shadow-[#123b3b]/10 md:hidden">
            <div className="mb-3 flex items-center gap-2 rounded-lg border border-[#d8e7e5] bg-[#f7fbfa] px-3 py-2 text-sm text-[#6b7f7f]">
              <Search size={16} />
              Search resources from the homepage
            </div>

            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  className={`rounded-lg px-3 py-2 text-sm font-bold transition ${
                    isActive(link.path)
                      ? 'bg-[#edf8f6] text-[#006666]'
                      : 'text-[#263a3a] hover:bg-[#f3f7f6]'
                  }`}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <div className="my-2 h-px bg-[#e5eeee]" />
              <Link className="rounded-lg border border-[#b9d4d0] px-4 py-2 text-center text-sm font-bold text-[#006666]" to="/login" onClick={() => setIsMenuOpen(false)}>Log in</Link>
              <Link className="rounded-lg bg-[#006666] px-4 py-2 text-center text-sm font-bold text-white" to="/register" onClick={() => setIsMenuOpen(false)}>Sign up</Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
