import React from "react";
import FsmsSidebar from "../../component/FsmsSidebar";
import LevelMassComPq from "../../component/Course Materials/Mass Communication Dept/LevelMassComPq";

const MassComPq = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <FsmsSidebar />
      <div className="flex-1 p-6 md:ml-64 md:p-8 overflow-y-auto">
        <LevelMassComPq />
      </div>
    </div>
  );
};

export default MassComPq;
