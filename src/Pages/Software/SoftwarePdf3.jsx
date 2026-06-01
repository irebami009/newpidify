import React from "react";
import FpasSidebar from "../../component/FpasSidebar";
import LevelSoft3 from "../../component/Course Materials/Software Engineering Dept/LevelSoft3";

const SoftwarePdf3 = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Section */}
      <FpasSidebar />

      {/* Main Content Section */}
      <div className="flex-1 p-6 md:ml-64 md:p-8 overflow-y-auto">
        <LevelSoft3 />
      </div>
    </div>
  );
};

export default SoftwarePdf3;
