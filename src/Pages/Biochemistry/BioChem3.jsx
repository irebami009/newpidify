import React from "react";
import FpasSidebar from "../../component/FpasSidebar";
import LevelBioChem3 from "../../component/Course Materials/Biochemistry Dept/LevelBioChem3";

const BioChem3 = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Section */}
      <FpasSidebar />

      {/* Main Content Section */}
      <div className="flex-1 p-6 md:ml-64 md:p-8 overflow-y-auto">
        <LevelBioChem3 />
      </div>
    </div>
  );
};

export default BioChem3;