// HeroPast.jsx
import React from 'react';

const HeroPast = () => {
  return (
    <>
      {/* Hero Past */}
      <section className="w-full pt-[6rem]">
        {/* Hero Text */}
        <div className="container mx-auto flex flex-wrap flex-col items-center justify-center">
          
          {/* Hero Text 1 */}
          <div className="flex items-center gap-6 pb-4">
            <img className="w-7 mb-10" src="/Images/hero2.png" alt="Hero Icon 1" />
            <img className="w-12" src="/Images/hero.png" alt="Hero Icon 2" />
            <h1 className="text-4xl text-[#006666] font-bold">Study Smarter Today!</h1>
          </div>
          {/* End of Hero Text 1 */}

          {/* Hero Text 2 */}
          <div className="flex flex-wrap flex-col items-center text-center">
            <h2 className="text-2xl text-[#121212]">
              Access Past Questions, Academic Resources &
            </h2>
            <h2 className="text-2xl pb-4 text-[#121212]">
              Interactive Quizzes All in One Place
            </h2>
            <p className="text-[#121212]">
              Learn smarter, prepare better, and test your knowledge with the skills built in you
            </p>

            {/* Search Bar */}
            <div className="container mx-auto px-4 mt-3">
              <div className="bg-white shadow-lg rounded-full border border-[#006666] flex items-center max-w-xl mx-auto">
                <input
                  className="flex-grow px-6 py-3 rounded-full focus:outline-none"
                  type="text"
                  placeholder="Search for past questions"
                />
                <img
                  className="w-4 mr-3"
                  src="/Images/search.png"
                  alt="Search Icon"
                />
              </div>
            </div>
            {/* End of Search Bar */}
          </div>
          {/* End of Hero Text 2 */}

        </div>
        {/* End of Hero Text */}
      </section>
      {/* End of Hero Section */}
    </>
  );
};

export default HeroPast;
