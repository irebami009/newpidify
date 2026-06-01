import React from "react";
import FpasSidebar from "../../component/FpasSidebar";
import LevelSoftPq2 from "../../component/Course Materials/Software Engineering Dept/LevelSoftPq2";

const SoftwarePq2 = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Section */}
      <FpasSidebar />

      {/* Main Content Section */}
      <div className="flex-1 p-6 md:ml-64 md:p-8 overflow-y-auto">
        <LevelSoftPq2 />
      </div>
    </div>
  );
};

export default SoftwarePq2;
