import React from 'react';

const MainQuiz = () => {
  return (
    <>
      {/* Main */}
      <section className="container w-full p-4">
        
        {/* First Container */}
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-5 pt-[3.5rem] cursor-pointer">
          <img
            className="w-[20%] hover:scale-105 transition-transform duration-300"
            src="/Images/image.png"
            alt="Image 1"
          />
          <img
            className="w-[20%] mb-[6rem] hover:scale-105 transition-transform duration-300"
            src="/Images/image copy 2.png"
            alt="Image 2"
          />
          <img
            className="w-[20%] hover:scale-105 transition-transform duration-300"
            src="/Images/image copy 3.png"
            alt="Image 3"
          />
        </div>

        {/* Second Container - How it works */}
        <div className="container bg-[#DFECEC] w-full rounded-2xl flex flex-wrap flex-col items-center justify-center p-[3rem] gap-10 mt-10">
          <div className="flex flex-wrap flex-col items-center justify-center text-center">
            <h1 className="text-4xl font-bold text-[#006666] mb-3">How It Works</h1>
            <p className="font-extralight">Get started in three simple steps and transform your study experience</p>
          </div>

          {/* Steps: Search - Access - Test */}
          <div className="flex flex-wrap items-center justify-center gap-[5rem] text-center">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <img className="w-12 mb-4 object-cover" src="/Images/icon1.png" alt="Search Icon" />
              <h3 className="font-bold text-[1.3rem]">Search your Course</h3>
              <p className="text-gray-900">Find materials by Department</p>
              <p className="text-gray-900">levels, or course code</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <img className="w-12 mb-4 object-cover" src="/Images/icon2.png" alt="Access Icon" />
              <h3 className="font-bold text-[1.3rem]">Access Past Questions</h3>
              <p className="text-gray-900">Download or view Verified Exams</p>
              <p className="text-gray-900">Papers From Previous Years</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <img className="w-12 mb-4 object-cover" src="/Images/icon3.png" alt="Test Icon" />
              <h3 className="font-bold text-[1.3rem]">Test With Quizzes</h3>
              <p className="text-gray-900">Practice With Courses Aligned</p>
              <p className="text-gray-900">Quizzes And Track Your Progress</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainQuiz;
