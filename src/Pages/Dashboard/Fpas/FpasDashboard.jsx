import React from "react";
import Fpas from "../../../component/Dashboards/Fpas";
import FpasSidebar from "../../../component/FpasSidebar";

const FpasDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 w-full overflow-x-hidden">

      <FpasSidebar />

      {/* Main Content */}
      <div className="ml-0 md:ml-64 transition-all duration-300 pt-14 md:pt-0">
        <Fpas />
      </div>

    </div>
  );
};

export default FpasDashboard;