import React from "react";
import FpasSidebar from "../../component/FpasSidebar";
import LevelCompPq1 from "../../component/Course Materials/Computer Science Dept/LevelCompPq1";
import LevelCompPq4 from "../../component/Course Materials/Computer Science Dept/LevelCompPq4";

const ComputerPq4 = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Section */}
      <FpasSidebar />

      {/* Main Content Section */}
      <div className="flex-1 p-6 md:ml-64 md:p-8 overflow-y-auto">
        <LevelCompPq4 />
      </div>
    </div>
  );
};

export default ComputerPq4;