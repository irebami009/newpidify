import React from "react";
import FpasSidebar from "../../component/FpasSidebar";
import LevelCompPdf1 from "../../component/Course Materials/Computer Science Dept/LevelCompPdf1";

const ComputerPdf1 = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Section */}
      <FpasSidebar />

      {/* Main Content Section */}
      <div className="flex-1 p-6 md:ml-64 md:p-8 overflow-y-auto">
        <LevelCompPdf1 />
      </div>
    </div>
  );
};

export default ComputerPdf1;
