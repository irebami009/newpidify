// HeroSection.jsx
import React from 'react';
import { ArrowRight, FileText, Search, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative w-full overflow-hidden px-4 py-8 sm:px-6 md:py-16 lg:px-12">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7 max-w-3xl">
          {/* Accent Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#b9d4d0] bg-white px-3 py-1.5 text-xs sm:text-sm font-bold text-[#006666] shadow-sm">
            <Sparkles size={14} className="text-[#006666]" />
            Built for focused campus study
          </div>

          {/* Heading with adjusted, refined sizing */}
          <h1 className="max-w-2xl text-3xl font-extrabold tracking-tight text-[#0e2929] sm:text-4xl md:text-5xl lg:leading-tight">
            Study smarter with verified resources, past questions, and quizzes.
          </h1>

          {/* Descriptive text with balanced font scale */}
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#536b6b] sm:text-base md:text-lg">
            Find the right material by faculty, department, course, and level. PDIFY keeps your revision stack organized so exam prep feels less scattered.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#006666] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-[#006666]/20 transition hover:bg-[#004f4f] hover:shadow-xl"
            >
              Create a free account
              <ArrowRight size={16} />
            </Link>
            <Link
              to="/past-questions"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[#b9d4d0] bg-white px-6 py-3 text-sm font-bold text-[#006666] transition hover:border-[#006666] hover:bg-[#edf8f6]"
            >
              Browse past questions
            </Link>
          </div>

          {/* Search Input Box */}
          <div className="mt-8 w-full max-w-xl rounded-2xl border border-[#d8e7e5] bg-white p-1.5 shadow-md shadow-[#123b3b]/5 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-3 rounded-xl bg-[#f7fbfa] px-4 py-2.5">
              <Search className="text-[#006666]" size={18} />
              <input
                className="min-w-0 flex-1 bg-transparent text-sm text-[#203535] outline-none placeholder:text-[#7b9292]"
                type="text"
                placeholder="Search courses, departments, or materials"
              />
              <FileText className="hidden text-[#94aaaa] sm:block" size={18} />
            </div>
          </div>

          {/* Academic Stats Grid */}
          <div className="mt-8 grid max-w-md grid-cols-3 gap-3">
            {[
              ['10+', 'Departments'],
              ['4', 'Levels'],
              ['24/7', 'Access'],
            ].map(([value, label]) => (
              <div key={label} className="rounded-xl border border-[#d8e7e5] bg-white/80 p-3.5 text-center sm:text-left transition-all duration-300 hover:border-[#b9d4d0]">
                <p className="text-xl font-bold text-[#006666]">{value}</p>
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#6b7f7f]">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Improved Image Presentation Container */}
        <div className="lg:col-span-5 relative w-full flex items-center justify-center p-6 sm:p-8 rounded-[2rem] border border-[#cde1de] bg-gradient-to-tr from-[#e8f4f2] to-[#f4faf9] shadow-xl shadow-[#123b3b]/5 overflow-visible min-h-[340px] sm:min-h-[400px]">
          {/* Status Badge top-left */}
          <div className="absolute left-4 top-6 rounded-2xl border border-[#d8e7e5] bg-white/95 backdrop-blur-sm p-3 shadow-md transition-transform hover:-translate-y-0.5 duration-300 z-10">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#7b9292]">Today</p>
            <p className="mt-0.5 text-xs font-extrabold text-[#0e2929]">Quiz practice ready</p>
          </div>

          {/* Main Visual Image with responsive constraints */}
          <img
            className="w-full max-w-[240px] sm:max-w-[280px] md:max-w-[320px] object-contain drop-shadow-xl hover:scale-[1.02] transition-transform duration-500"
            src="/Images/image.png"
            alt="Student using academic resources"
          />

          {/* Status Badge bottom-right */}
          <div className="absolute right-4 bottom-6 rounded-2xl bg-[#006666] p-3 text-white shadow-md transition-transform hover:-translate-y-0.5 duration-300 z-10">
            <p className="text-[10px] font-semibold text-white/85 uppercase tracking-wider">Next up</p>
            <p className="mt-0.5 text-xs font-extrabold">Course materials</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
