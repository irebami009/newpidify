import React from "react";
import FpasSidebar from "../../component/FpasSidebar";
import LevelSoftPq1 from "../../component/Course Materials/Software Engineering Dept/LevelSoftPq1";

const SoftwarePq1 = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Section */}
      <FpasSidebar />

      {/* Main Content Section */}
      <div className="flex-1 p-6 md:ml-64 md:p-8 overflow-y-auto">
        <LevelSoftPq1 />
      </div>
    </div>
  );
};

export default SoftwarePq1;
