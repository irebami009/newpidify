import React from "react";
import FsmsSidebar from "../../component/FsmsSidebar";
import LevelInterRelPq from "../../component/Course Materials/International Relations Dept/LevelInterRelPq";

const InterRelPq = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <FsmsSidebar />
      <div className="flex-1 p-6 md:ml-64 md:p-8 overflow-y-auto">
        <LevelInterRelPq />
      </div>
    </div>
  );
};

export default InterRelPq;
