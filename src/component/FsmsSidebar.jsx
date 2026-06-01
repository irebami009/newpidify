import React, { useState } from "react";
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
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const FsmsSidebar = () => {
  const [openPastQ, setOpenPastQ] = useState(false);
  const [openCourses, setOpenCourses] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const location = useLocation();

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

  return (
    <>
      {/* Mobile toggle */}
      <button
        className={`md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-md ${sidebarOpen ? "hidden" : ""}`}
        onClick={() => setSidebarOpen((prev) => !prev)}
      >
        <Menu size={22} />
      </button>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-gray-900 text-white flex flex-col p-4 shadow-lg z-40
          transform transition-all duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          w-64
        `}
      >
        {/* Top */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-xl font-semibold">PDIFY</h1>

          <button
            className="md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-2">

          {/* Home */}
          <Link
            to="/dashboard/fsms"
            className={`flex items-center gap-3 p-2 rounded-lg transition
              ${isActive("/dashboard/fsms")
                ? "bg-gray-700"
                : "hover:bg-gray-700"}
            `}
            onClick={() => setSidebarOpen(false)}
          >
            <Home size={20} />
            Home
          </Link>

          {/* Course Materials */}
          <div>
            <button
              onClick={() => setOpenCourses(!openCourses)}
              className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-700"
            >
              <span className="flex items-center gap-3">
                <BookOpen size={20} />
                Course Materials
              </span>

              <ChevronDown
                size={18}
                className={`${openCourses ? "rotate-180" : ""} transition`}
              />
            </button>

            {openCourses && (
              <div className="ml-6 mt-2 space-y-2 text-sm">
                {CourseMaterialsDepartment.map((dept, i) => (
                  <Link
                    key={i}
                    to={dept.path}
                    className={`block p-1 rounded ${
                      isActive(dept.path)
                        ? "text-blue-400"
                        : "hover:text-gray-400"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {dept.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Past Questions */}
          <div>
            <button
              onClick={() => setOpenPastQ(!openPastQ)}
              className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-700"
            >
              <span className="flex items-center gap-3">
                <FileQuestion size={20} />
                Past Questions
              </span>

              <ChevronDown
                size={18}
                className={`${openPastQ ? "rotate-180" : ""} transition`}
              />
            </button>

            {openPastQ && (
              <div className="ml-6 mt-2 space-y-2 text-sm">
                {PastQuestionsDepartment.map((dept, i) => (
                  <Link
                    key={i}
                    to={dept.path}
                    className={`block p-1 rounded ${
                      isActive(dept.path)
                        ? "text-blue-400"
                        : "hover:text-gray-400"
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
            className={`flex items-center gap-3 p-2 rounded-lg transition
              ${isActive("/fsmstimetable")
                ? "bg-gray-700"
                : "hover:bg-gray-700"}
            `}
            onClick={() => setSidebarOpen(false)}
          >
            <CalendarDays size={20} />
            Timetable
          </Link>

          {/* Announcements */}
          <Link
            to="/announcementfsms"
            className={`flex items-center gap-3 p-2 rounded-lg transition
              ${isActive("/announcementfsms")
                ? "bg-gray-700"
                : "hover:bg-gray-700"}
            `}
            onClick={() => setSidebarOpen(false)}
          >
            <Megaphone size={20} />
            Announcements
          </Link>

          {/* Logout */}
          <Link
            to="/login"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-red-600 mt-4"
            onClick={() => setSidebarOpen(false)}
          >
            <LogOut size={20} />
            Logout
          </Link>

        </nav>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default FsmsSidebar;