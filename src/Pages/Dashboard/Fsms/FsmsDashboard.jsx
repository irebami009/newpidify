import React from "react";
import FsmsSidebar from "../../../component/FsmsSidebar";
import Fsms from "../../../component/Dashboards/Fsms";

const FsmsDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 w-full overflow-x-hidden">

      <FsmsSidebar />

      <div className="ml-0 md:ml-64 transition-all duration-300 pt-14 md:pt-0">
        <Fsms />
      </div>

    </div>
  );
};

export default FsmsDashboard;