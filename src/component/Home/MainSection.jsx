import React from 'react';
import { ArrowRight, BadgeCheck, BookMarked, Download, GraduationCap, Library, PenLine, Smartphone, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const MainSection = () => {
  const steps = [
    {
      icon: Library,
      title: "Find your department",
      desc: "Start from your faculty, pick your department, and move straight to the level you need.",
    },
    {
      icon: Download,
      title: "Open verified files",
      desc: "View or download materials and past questions without digging through random group chats.",
    },
    {
      icon: PenLine,
      title: "Practice with quizzes",
      desc: "Use quick quizzes to test retention before exams and spot weak areas early.",
    },
  ];

  const tools = [
    {
      icon: BookMarked,
      title: "Past Question Archive",
      desc: "Reliable exam papers grouped by faculty, department, level, and resource type.",
      img: "tools1.png",
    },
    {
      icon: GraduationCap,
      title: "Course Materials",
      desc: "Lecture notes, handouts, and PDFs arranged so students can scan and choose quickly.",
      img: "tools3.png",
    },
    {
      icon: Trophy,
      title: "Interactive Quizzes",
      desc: "Practice questions built for revision sessions when you need fast feedback.",
      img: "tools2.png",
    },
    {
      icon: Smartphone,
      title: "Mobile Ready",
      desc: "Layouts tuned for phone screens, quick taps, and low-friction repeat use.",
      img: "tools4.png",
    },
  ];

  const testimonials = [
    {
      text: "Finally, a one-stop platform for university past questions. No more WhatsApp stress.",
      img: "testimonial1.png",
      name: "Amara O.",
      dept: "Computer Science",
      level: "300 level",
    },
    {
      text: "The quizzes helped me walk into exams with a plan instead of panic.",
      img: "testimonial2.png",
      name: "Lola A.",
      dept: "Business Administration",
      level: "400 level",
    },
    {
      text: "Everything is organized by department and level, so finding resources is quick.",
      img: "testimonial3.png",
      name: "David M.",
      dept: "Cyber Security",
      level: "200 level",
    },
  ];

  return (
    <section className="w-full">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-12">
        <div className="grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-black uppercase text-[#006666]">How it works</p>
            <h2 className="mt-3 text-3xl font-black text-[#0e2929] sm:text-4xl">
              Three steps from scattered study to organized revision.
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <article key={step.title} className="rounded-lg border border-[#d8e7e5] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#123b3b]/10">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#e6f4f1] text-[#006666]">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-4 text-lg font-black text-[#0e2929]">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#536b6b]">{step.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <div className="border-y border-[#d8e7e5] bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-12">
          <div>
            <p className="text-sm font-black uppercase text-[#006666]">Academic toolkit</p>
            <h2 className="mt-3 text-3xl font-black text-[#0e2929] sm:text-4xl">
              Everything students need to revise with less friction.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-[#536b6b]">
              PDIFY keeps the experience practical: less decoration, clearer resource paths, and enough structure for students to return every week.
            </p>

            <div className="mt-8 flex gap-3">
              <img className="w-24 rounded-lg border border-[#d8e7e5] bg-[#eef7f5] p-3 sm:w-32" src="/Images/image copy 2.png" alt="Academic material preview" />
              <img className="w-24 rounded-lg border border-[#d8e7e5] bg-[#eef7f5] p-3 sm:w-32" src="/Images/image copy 3.png" alt="Quiz resource preview" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <article key={tool.title} className="rounded-lg border border-[#d8e7e5] bg-[#f8fbfa] p-5 transition hover:border-[#006666]/30 hover:bg-white">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white text-[#006666] shadow-sm">
                      <Icon size={22} />
                    </span>
                    <img className="h-10 w-10 object-contain" src={`/Images/${tool.img}`} alt="" />
                  </div>
                  <h3 className="mt-4 text-lg font-black text-[#0e2929]">{tool.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[#536b6b]">{tool.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-12">
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-black uppercase text-[#006666]">Student proof</p>
            <h2 className="mt-3 text-3xl font-black text-[#0e2929] sm:text-4xl">Built around real study habits.</h2>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#e6f4f1] px-4 py-2 text-sm font-bold text-[#006666]">
            <BadgeCheck size={18} />
            Organized by faculty and level
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {testimonials.map((student) => (
            <article key={student.name} className="rounded-lg border border-[#d8e7e5] bg-white p-5 shadow-sm">
              <p className="text-sm leading-6 text-[#536b6b]">"{student.text}"</p>
              <div className="mt-5 flex items-center gap-3">
                <img className="h-12 w-12 rounded-full object-cover" src={`/Images/${student.img}`} alt={student.name} />
                <div>
                  <h3 className="font-black text-[#0e2929]">{student.name}</h3>
                  <p className="text-sm text-[#6b7f7f]">{student.dept} · {student.level}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="px-4 pb-14 sm:px-6 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-lg bg-[#0e2929] p-6 text-white shadow-2xl shadow-[#123b3b]/20 sm:p-8 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase text-[#9dd8cf]">Ready for your next exam?</p>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">Start building a cleaner revision routine.</h2>
          </div>
          <Link
            to="/register"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-black text-[#006666] transition"
          >
            Create account
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MainSection;
