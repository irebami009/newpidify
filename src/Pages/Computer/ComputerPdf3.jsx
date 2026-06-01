import React from "react";
import FpasSidebar from "../../component/FpasSidebar";
import LevelCompPdf3 from "../../component/Course Materials/Computer Science Dept/LevelCompPdf3";

const ComputerPdf3 = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Section */}
      <FpasSidebar />

      {/* Main Content Section */}
      <div className="flex-1 p-6 md:ml-64 md:p-8 overflow-y-auto">
        <LevelCompPdf3 />
      </div>
    </div>
  );
};

export default ComputerPdf3;
