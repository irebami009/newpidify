import React from "react";
import FpasSidebar from "../../component/FpasSidebar";
import LevelBioChem1 from "../../component/Course Materials/Biochemistry Dept/LevelBioChem1";

const BioChem1 = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Section */}
      <FpasSidebar />

      {/* Main Content Section */}
      <div className="flex-1 p-6 md:ml-64 md:p-8 overflow-y-auto">
        <LevelBioChem1 />
      </div>
    </div>
  );
};

export default BioChem1;