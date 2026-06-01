import React, { useState } from "react";
import { ChevronDown, LogOut, BookOpen, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const departments = [
  { name: "Computer Science" },
  { name: "Software Engineering" },
  { name: "Cyber Security" },
  { name: "Economics" },
  { name: "Accounting" },
  { name: "Mass Communication" },
  { name: "Business Administration" },
  { name: "International Relations" },
];

const levels = ["100 Level", "200 Level", "300 Level", "400 Level"];

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const [openDept, setOpenDept] = useState({});
  const [openMaterials, setOpenMaterials] = useState({});
  const [openPast, setOpenPast] = useState({});

  const toggleDept = (dept) =>
    setOpenDept((prev) => ({ ...prev, [dept]: !prev[dept] }));

  const toggleMaterials = (dept) =>
    setOpenMaterials((prev) => ({ ...prev, [dept]: !prev[dept] }));

  const togglePast = (dept) =>
    setOpenPast((prev) => ({ ...prev, [dept]: !prev[dept] }));

  return (
    <div
      className={`inset-y-0 left-0 w-64 bg-gray-900 text-white p-4 flex flex-col shadow-lg transform transition-transform duration-300
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center mb-8">
        <img src="/logo.png" alt="Logo" className="w-10 h-10 mr-2 rounded-full" />
        <h1 className="text-xl font-semibold">PDIFY</h1>
      </div>

      {/* Departments Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto">
        {departments.map((dept) => (
          <div key={dept.name}>
            {/* Department Toggle */}
            <button
              onClick={() => toggleDept(dept.name)}
              className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-700 transition"
            >
              <span className="font-medium">{dept.name}</span>
              <ChevronDown
                size={18}
                className={`transition-transform ${openDept[dept.name] ? "rotate-180" : ""}`}
              />
            </button>

            {openDept[dept.name] && (
              <div className="ml-6 mt-2 space-y-2 text-sm">
                {/* Course Materials Dropdown */}
                <div>
                  <button
                    onClick={() => toggleMaterials(dept.name)}
                    className="flex items-center justify-between w-full hover:text-gray-300"
                  >
                    <span>
                      <BookOpen size={16} className="inline mr-1" /> Course Materials
                    </span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${
                        openMaterials[dept.name] ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openMaterials[dept.name] && (
                    <div className="ml-4 mt-1 space-y-1">
                      {levels.map((level) => (
                        <Link
                          key={level}
                          to={`/admin/${dept.name.toLowerCase().replace(/\s/g, "-")}/materials/${level
                            .toLowerCase()
                            .replace(" ", "-")}`}
                          className="block hover:text-gray-400"
                          onClick={() => setSidebarOpen(false)}
                        >
                          {level}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* Past Questions Dropdown */}
                <div>
                  <button
                    onClick={() => togglePast(dept.name)}
                    className="flex items-center justify-between w-full hover:text-gray-300"
                  >
                    <span>
                      <FileText size={16} className="inline mr-1" /> Past Questions
                    </span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform ${
                        openPast[dept.name] ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openPast[dept.name] && (
                    <div className="ml-4 mt-1 space-y-1">
                      {levels.map((level) => (
                        <Link
                          key={level}
                          to={`/admin/${dept.name.toLowerCase().replace(/\s/g, "-")}/past/${level
                            .toLowerCase()
                            .replace(" ", "-")}`}
                          className="block hover:text-gray-400"
                          onClick={() => setSidebarOpen(false)}
                        >
                          {level}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Logout */}
        <Link
          to="/admin/logout"
          onClick={() => setSidebarOpen(false)}
          className="flex items-center gap-3 p-2 mt-4 rounded-lg hover:bg-red-600 transition"
        >
          <LogOut size={20} /> Logout
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;
