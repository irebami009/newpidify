import React from "react";
import FpasSidebar from "../../component/FpasSidebar";
import LevelMicroPq4 from "../../component/Course Materials/Micro-Biology Dept/LevelMicroPq4";

const MicroBiologyPq4 = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Section */}
      <FpasSidebar />

      {/* Main Content Section */}
      <div className="flex-1 p-6 md:ml-64 md:p-8 overflow-y-auto">
        <LevelMicroPq4 />
      </div>
    </div>
  );
};

export default MicroBiologyPq4;
