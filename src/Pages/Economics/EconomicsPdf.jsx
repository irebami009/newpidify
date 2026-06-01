import React from "react";
import FsmsSidebar from "../../component/FsmsSidebar";
import LevelEconomics from "../../component/Course Materials/Economics Dept/LevelEconomics";

const EconomicsPdf = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <FsmsSidebar />
      <div className="flex-1 p-6 md:ml-64 md:p-8 overflow-y-auto">
        <LevelEconomics />
      </div>
    </div>
  );
};

export default EconomicsPdf;
