import React from 'react';
import { Facebook, Instagram, Mail, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const IntroFooter = () => {
  return (
    <footer className="bg-[#071212] text-white">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-12">
        <div className="grid gap-10 border-b border-white/10 pb-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#006666]">
                <ShieldCheck size={21} />
              </span>
              <span className="text-2xl font-black">PDIFY</span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/70">
              Built for university students by students. One place for academic resources, past questions, quizzes, and faculty updates.
            </p>

            <div className="mt-5 flex gap-3">
              {[
                { icon: Instagram, label: 'Instagram' },
                { icon: Facebook, label: 'Facebook' },
                { icon: Mail, label: 'Email' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.label}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white/70 transition hover:border-[#9dd8cf] hover:text-[#9dd8cf]"
                    aria-label={item.label}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase text-[#9dd8cf]">Explore</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/70">
              <Link className="transition hover:text-white" to="/">Resources</Link>
              <Link className="transition hover:text-white" to="/past-questions">Past Questions</Link>
              <Link className="transition hover:text-white" to="/quiz">Quizzes</Link>
              <Link className="transition hover:text-white" to="/login">Log in</Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black uppercase text-[#9dd8cf]">Support</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-white/70">
              <a href="#" className="transition hover:text-white">Academic Integrity</a>
              <a href="#" className="transition hover:text-white">FAQs</a>
              <a href="#" className="transition hover:text-white">Privacy Policy</a>
              <a href="#" className="transition hover:text-white">Terms</a>
            </div>
          </div>
        </div>

        <p className="pt-6 text-center text-xs text-white/45 sm:text-sm">
          Copyright 2025 PDIFY. Powered by SamyTech Digital Concept.
        </p>
      </div>
    </footer>
  );
};

export default IntroFooter;
