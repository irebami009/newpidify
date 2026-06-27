import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  Home,
  LogOut,
  Menu,
  X,
  BookOpen,
  FileQuestion,
  CalendarDays,
  Megaphone,
  ClipboardCheck,
  Settings,
  User,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const FsmsSidebar = () => {
  const [openPastQ, setOpenPastQ] = useState(false);
  const [openCourses, setOpenCourses] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();

  // Load user data dynamically with storage listener
  const [user, setUser] = useState(() => {
    try {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    } catch (e) {
      return null;
    }
  });

  useEffect(() => {
    const handleStorage = () => {
      try {
        const userStr = localStorage.getItem("user");
        setUser(userStr ? JSON.parse(userStr) : null);
      } catch (e) {
        console.error(e);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const profilePic = user ? user.profile_picture || localStorage.getItem(`profile_pic_${user.id}`) : null;

  const PastQuestionsDepartment = [
    { name: "Economics", path: "/economics-pq/100" },
    { name: "Accounting", path: "/accounting-pq/100" },
    { name: "International Relations", path: "/international-relations-pq/100" },
    { name: "Business Administration", path: "/business-administration-pq/100" },
    { name: "Mass Communication", path: "/mass-communication-pq/100" },
  ];

  const CourseMaterialsDepartment = [
    { name: "Economics", path: "/economics/100" },
    { name: "Accounting", path: "/accounting/100" },
    { name: "International Relations", path: "/international-relations/100" },
    { name: "Business Administration", path: "/business-administration/100" },
    { name: "Mass Communication", path: "/mass-communication/100" },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("user");
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile toggle */}
      <button
        className={`md:hidden fixed top-4 left-4 z-50 bg-[#006666] text-white p-2.5 rounded-xl shadow-lg shadow-[#006666]/30 border border-[#007777]/20 ${
          sidebarOpen ? "hidden" : ""
        }`}
        onClick={() => setSidebarOpen((prev) => !prev)}
        aria-label="Open sidebar"
      >
        <Menu size={20} />
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-gradient-to-b from-[#0a1f1f] to-[#0e2929] text-white flex flex-col p-5 shadow-2xl border-r border-white/5 z-40
          transform transition-all duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          w-64
        `}
      >
        {/* Top Header Logo */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10 shrink-0">
          <Link to="/dashboard/fsms" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#006666] to-[#008080] shadow-md shadow-[#006666]/20">
              <BookOpen size={18} className="text-white" />
            </span>
            <span className="text-xl font-black tracking-wider bg-clip-text bg-gradient-to-r from-white to-[#9dd8cf]">
              PDIFY
            </span>
          </Link>

          <button
            className="md:hidden rounded-xl p-1.5 text-white/60 hover:bg-white/10 hover:text-white transition"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Navigation Area */}
        <nav className="flex-1 space-y-1.5 overflow-y-auto pr-1 custom-sidebar-scroll">
          {/* Home */}
          <Link
            to="/dashboard/fsms"
            className={`flex items-center gap-3 p-3 rounded-xl text-sm font-bold transition-all duration-200
              ${
                isActive("/dashboard/fsms")
                  ? "bg-[#006666]/30 text-[#4fd1c5] shadow-sm shadow-[#006666]/10 border-l-4 border-[#006666]"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }
            `}
            onClick={() => setSidebarOpen(false)}
          >
            <Home size={18} />
            Home
          </Link>

          {/* Course Materials Dropdown */}
          <div className="rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenCourses(!openCourses)}
              className={`flex w-full items-center justify-between p-3 text-sm font-bold transition-all duration-200
                ${
                  openCourses
                    ? "bg-white/5 text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }
              `}
            >
              <span className="flex items-center gap-3">
                <BookOpen size={18} />
                Course Materials
              </span>
              <ChevronDown
                size={16}
                className={`${openCourses ? "rotate-180" : ""} transition duration-200`}
              />
            </button>

            {openCourses && (
              <div className="pl-6 pr-2 py-1.5 space-y-1 bg-white/[0.02] border-l border-white/10 ml-5 mt-1">
                {CourseMaterialsDepartment.map((dept, i) => (
                  <Link
                    key={i}
                    to={dept.path}
                    className={`block rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-150 ${
                      isActive(dept.path)
                        ? "bg-[#006666]/30 text-[#4fd1c5] font-bold"
                        : "text-white/55 hover:text-white"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {dept.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Past Questions Dropdown */}
          <div className="rounded-xl overflow-hidden">
            <button
              onClick={() => setOpenPastQ(!openPastQ)}
              className={`flex w-full items-center justify-between p-3 text-sm font-bold transition-all duration-200
                ${
                  openPastQ
                    ? "bg-white/5 text-white"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }
              `}
            >
              <span className="flex items-center gap-3">
                <FileQuestion size={18} />
                Past Questions
              </span>
              <ChevronDown
                size={16}
                className={`${openPastQ ? "rotate-180" : ""} transition duration-200`}
              />
            </button>

            {openPastQ && (
              <div className="pl-6 pr-2 py-1.5 space-y-1 bg-white/[0.02] border-l border-white/10 ml-5 mt-1">
                {PastQuestionsDepartment.map((dept, i) => (
                  <Link
                    key={i}
                    to={dept.path}
                    className={`block rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-150 ${
                      isActive(dept.path)
                        ? "bg-[#006666]/30 text-[#4fd1c5] font-bold"
                        : "text-white/55 hover:text-white"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {dept.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Timetable */}
          <Link
            to="/fsmstimetable"
            className={`flex items-center gap-3 p-3 rounded-xl text-sm font-bold transition-all duration-200
              ${
                isActive("/fsmstimetable")
                  ? "bg-[#006666]/30 text-[#4fd1c5] shadow-sm shadow-[#006666]/10 border-l-4 border-[#006666]"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }
            `}
            onClick={() => setSidebarOpen(false)}
          >
            <CalendarDays size={18} />
            Timetable
          </Link>

          {/* Announcements */}
          <Link
            to="/announcementfsms"
            className={`flex items-center gap-3 p-3 rounded-xl text-sm font-bold transition-all duration-200
              ${
                isActive("/announcementfsms")
                  ? "bg-[#006666]/30 text-[#4fd1c5] shadow-sm shadow-[#006666]/10 border-l-4 border-[#006666]"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }
            `}
            onClick={() => setSidebarOpen(false)}
          >
            <Megaphone size={18} />
            Announcements
          </Link>

          {/* Quiz */}
          <Link
            to="/quiz"
            className={`flex items-center gap-3 p-3 rounded-xl text-sm font-bold transition-all duration-200
              ${
                isActive("/quiz")
                  ? "bg-[#006666]/30 text-[#4fd1c5] shadow-sm shadow-[#006666]/10 border-l-4 border-[#006666]"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }
            `}
            onClick={() => setSidebarOpen(false)}
          >
            <ClipboardCheck size={18} />
            Quiz
          </Link>

          {/* Settings */}
          <Link
            to="/settings"
            className={`flex items-center gap-3 p-3 rounded-xl text-sm font-bold transition-all duration-200
              ${
                isActive("/settings")
                  ? "bg-[#006666]/30 text-[#4fd1c5] shadow-sm shadow-[#006666]/10 border-l-4 border-[#006666]"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }
            `}
            onClick={() => setSidebarOpen(false)}
          >
            <Settings size={18} />
            Settings
          </Link>
        </nav>

        {/* Footer Area: User Card & Logout */}
        <div className="pt-4 border-t border-white/10 mt-auto shrink-0 space-y-3">
          {/* User Profile Card */}
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.04] border border-white/5">
            <div className="w-9 h-9 rounded-xl bg-[#006666] flex items-center justify-center text-white font-black text-sm overflow-hidden shrink-0 border border-white/10 shadow-inner">
              {profilePic ? (
                <img src={profilePic} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                user?.fullname ? user.fullname.charAt(0).toUpperCase() : <User size={16} />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold truncate text-white leading-tight">
                {user?.fullname || "Student Name"}
              </p>
              <p className="text-[10px] text-white/55 truncate mt-0.5">
                {user?.email || "student@school.edu"}
              </p>
            </div>
          </div>

          {/* Logout */}
          <Link
            to="/login"
            className="flex items-center gap-3 rounded-xl p-3 text-sm font-bold text-white/70 hover:bg-[#e5484d]/25 hover:text-[#ff6b70] transition-all duration-200 border border-transparent hover:border-[#e5484d]/30"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Logout
          </Link>
        </div>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden transition-all duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default FsmsSidebar;
