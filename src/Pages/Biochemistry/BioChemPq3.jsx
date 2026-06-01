import React from "react";
import FpasSidebar from "../../component/FpasSidebar";
import LevelBioChemPq3 from "../../component/Course Materials/Biochemistry Dept/LevelBioChemPq3";

const BioChemPq3 = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Section */}
      <FpasSidebar />

      {/* Main Content Section */}
      <div className="flex-1 p-6 md:ml-64 md:p-8 overflow-y-auto">
        <LevelBioChemPq3 />
      </div>
    </div>
  );
};

export default BioChemPq3;
