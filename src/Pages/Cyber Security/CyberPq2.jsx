import React from "react";
import FpasSidebar from "../../component/FpasSidebar";
import LevelCybPq2 from "../../component/Course Materials/Cyber Security Dept/LevelCybPq2";

const CyberPq2 = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Section */}
      <FpasSidebar />

      {/* Main Content Section */}
      <div className="flex-1 p-6 md:ml-64 md:p-8 overflow-y-auto">
        <LevelCybPq2 />
      </div>
    </div>
  );
};

export default CyberPq2;
