import React from "react";
import FsmsSidebar from "../../component/FsmsSidebar";
import LevelAccounting from "../../component/Course Materials/Accounting Dept/LevelAccounting";

const AccountingPdf = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <FsmsSidebar />
      <div className="flex-1 p-6 md:ml-64 md:p-8 overflow-y-auto">
        <LevelAccounting />
      </div>
    </div>
  );
};

export default AccountingPdf;
