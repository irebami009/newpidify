import React from "react";
import FsmsSidebar from "../../component/FsmsSidebar";
import LevelInterRel from "../../component/Course Materials/International Relations Dept/LevelInterRel";

const InterRelPdf = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <FsmsSidebar />
      <div className="flex-1 p-6 md:ml-64 md:p-8 overflow-y-auto">
        <LevelInterRel />
      </div>
    </div>
  );
};

export default InterRelPdf;
