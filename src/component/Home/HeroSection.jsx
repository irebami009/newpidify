// HeroSection.jsx
import React from 'react';

const HeroSection = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="w-full pt-6 sm:pt-10 md:pt-14 lg:pt-20 px-4">
        {/* Hero Text */}
        <div className="max-w-7xl mx-auto flex flex-wrap flex-col items-center justify-center">
          
          {/* Hero Text 1 */}
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6 pb-4">
            <img className="w-5 sm:w-7" src="/Images/hero2.png" alt="Hero Icon 1" />
            <img className="w-8 sm:w-12" src="/Images/hero.png" alt="Hero Icon 2" />
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#006666] font-bold text-center">Study Smarter Today!</h1>
          </div>
          {/* End of Hero Text 1 */}

          {/* Hero Text 2 */}
          <div className="flex flex-wrap flex-col items-center text-center">
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#121212] mb-2">
              Access Past Questions, Academic Resources &
            </h2>
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl pb-3 sm:pb-4 text-[#121212] mb-2">
              Interactive Quizzes All in One Place
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-[#121212] mb-4 px-4 max-w-2xl">
              Learn smarter, prepare better, and test your knowledge with the skills built in you
            </p>

            {/* Search Bar */}
            <div className="w-full max-w-2xl px-4">
              <div className="bg-white shadow-lg rounded-full border border-[#006666] flex items-center">
                <input
                  className="flex-grow px-3 sm:px-6 py-2 sm:py-3 rounded-full focus:outline-none text-sm sm:text-base"
                  type="text"
                  placeholder="Search courses and questions"
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

export default HeroSection;
