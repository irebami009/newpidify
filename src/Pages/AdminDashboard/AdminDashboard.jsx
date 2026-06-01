import React, { useState } from "react";
import AdminSidebar from "../../component/AdminSidebar";
import { Bell, User, Menu } from "lucide-react";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const adminName = "Admin User";

  const departments = [
    { name: "Computer Science", color: "blue-50", textColor: "blue-700" },
    { name: "Natural Science", color: "green-50", textColor: "green-700" },
    { name: "Economics & Business", color: "yellow-50", textColor: "yellow-700" },
    { name: "Mass Communication", color: "purple-50", textColor: "purple-700" },
    { name: "Accounting", color: "pink-50", textColor: "pink-700" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <header className="flex items-center justify-between bg-white shadow-md px-4 py-4 md:px-8">
          <div className="flex items-center gap-4">
            <button
              className="md:hidden"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-xl md:text-2xl font-semibold text-gray-700">
              Admin Dashboard
            </h1>
          </div>

          <div className="flex items-center space-x-4 md:space-x-6">
            <button className="relative">
              <Bell className="w-5 h-5 md:w-6 md:h-6 text-gray-600 hover:text-gray-800" />
              <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full" />
            </button>

            <div className="flex items-center space-x-2 md:space-x-3">
              <span className="text-sm md:text-base font-medium text-gray-700">
                Hi, {adminName}
              </span>
              <div className="w-8 h-8 md:w-9 md:h-9 bg-gray-200 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 md:w-5 md:h-5 text-gray-600" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard content */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto space-y-6">
          {/* Welcome Section */}
          <section className="bg-white rounded-2xl shadow-md p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Welcome back, {adminName}! 👋
            </h1>
            <p className="text-gray-600 text-sm md:text-base">
              Use the sidebar to manage departments, course materials, and past questions for all faculties.
            </p>
          </section>

          {/* Dashboard Overview */}
          <section className="bg-white rounded-2xl shadow-md p-6 md:p-8">
            <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-4">
              Dashboard Overview
            </h2>
            <p className="text-gray-600 text-sm md:text-base mb-4">
              Click on a department in the sidebar to manage its course materials and past questions. Everything is organized by department and levels.
            </p>

            {/* Department Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {departments.map((dept) => (
                <div
                  key={dept.name}
                  className={`bg-${dept.color} p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition`}
                >
                  <h3 className={`text-md md:text-lg font-semibold text-${dept.textColor} mb-2`}>
                    {dept.name}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Manage courses and past questions.
                  </p>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
