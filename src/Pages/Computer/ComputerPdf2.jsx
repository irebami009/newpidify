import React from "react";
import FpasSidebar from "../../component/FpasSidebar";
import LevelCompPdf2 from "../../component/Course Materials/Computer Science Dept/LevelCompPdf2";

const ComputerPdf2 = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Section */}
      <FpasSidebar />

      {/* Main Content Section */}
      <div className="flex-1 p-6 md:ml-64 md:p-8 overflow-y-auto">
        <LevelCompPdf2 />
      </div>
    </div>
  );
};

export default ComputerPdf2;
