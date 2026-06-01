import React from "react";
import FsmsSidebar from "../../component/FsmsSidebar";
import LevelMassCom from "../../component/Course Materials/Mass Communication Dept/LevelMassCom";

const MassComPdf = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <FsmsSidebar />
      <div className="flex-1 p-6 md:ml-64 md:p-8 overflow-y-auto">
        <LevelMassCom />
      </div>
    </div>
  );
};

export default MassComPdf;
