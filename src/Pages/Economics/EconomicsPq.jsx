import React from "react";
import FsmsSidebar from "../../component/FsmsSidebar";
import LevelEconomicsPq from "../../component/Course Materials/Economics Dept/LevelEconomicsPq";

const EconomicsPq = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <FsmsSidebar />
      <div className="flex-1 p-6 md:ml-64 md:p-8 overflow-y-auto">
        <LevelEconomicsPq />
      </div>
    </div>
  );
};

export default EconomicsPq;
