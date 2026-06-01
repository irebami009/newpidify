import React from "react";
import FpasSidebar from "../../component/FpasSidebar";
import LevelCyb1 from "../../component/Course Materials/Cyber Security Dept/LevelCyb1";

const CyberPdf = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Section */}
      <FpasSidebar />

      {/* Main Content Section */}
      <div className="flex-1 p-6 md:ml-64 md:p-8 overflow-y-auto">
        <LevelCyb1 />
      </div>
    </div>
  );
};

export default CyberPdf;
