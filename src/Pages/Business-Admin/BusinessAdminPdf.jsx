import React from "react";
import FsmsSidebar from "../../component/FsmsSidebar";
import LevelBusinessAdmin from "../../component/Course Materials/Business Administration Dept/LevelBusinessAdmin";

const BusinessAdminPdf = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <FsmsSidebar />
      <div className="flex-1 p-6 md:ml-64 md:p-8 overflow-y-auto">
        <LevelBusinessAdmin />
      </div>
    </div>
  );
};

export default BusinessAdminPdf;
