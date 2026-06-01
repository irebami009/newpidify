import React from 'react';

const MainSection = () => {
  return (
    <>
      {/* Main */}
      <section className="w-full px-4 sm:px-6 md:px-8">
        
        {/* First Container */}
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-5 pt-6 sm:pt-8 md:pt-12 lg:pt-16 cursor-pointer">
          <img
            className="w-24 sm:w-28 md:w-32 lg:w-40 hover:scale-105 transition-transform duration-300"
            src="/Images/image.png"
            alt="Image 1"
          />
          <img
            className="w-24 sm:w-28 md:w-32 lg:w-40 mb-8 sm:mb-12 md:mb-16 lg:mb-24 hover:scale-105 transition-transform duration-300"
            src="/Images/image copy 2.png"
            alt="Image 2"
          />
          <img
            className="w-24 sm:w-28 md:w-32 lg:w-40 hover:scale-105 transition-transform duration-300"
            src="/Images/image copy 3.png"
            alt="Image 3"
          />
        </div>

        {/* Second Container - How it works */}
        <div className="max-w-7xl mx-auto bg-[#DFECEC] w-full rounded-xl sm:rounded-2xl flex flex-wrap flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 gap-6 sm:gap-8 md:gap-10 mt-8 sm:mt-12 md:mt-16">
          <div className="flex flex-wrap flex-col items-center justify-center text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#006666] mb-2 sm:mb-3">How It Works</h1>\n            <p className="font-extralight text-sm sm:text-base md:text-lg px-2">Get started in three simple steps and transform your study experience</p>
          </div>

          {/* Steps: Search - Access - Test */}
          <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-16 text-center w-full">
            {/* Step 1 */}
            <div className="flex flex-col items-center flex-1 min-w-max">
              <img className="w-10 sm:w-12 md:w-14 mb-2 sm:mb-3 md:mb-4 object-cover" src="/Images/icon1.png" alt="Search Icon" />
              <h3 className="font-bold text-base sm:text-lg md:text-xl">Search your Course</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-900">Find materials by Department</p>
              <p className="text-xs sm:text-sm md:text-base text-gray-900">levels, or course code</p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center flex-1 min-w-max">
              <img className="w-10 sm:w-12 md:w-14 mb-2 sm:mb-3 md:mb-4 object-cover" src="/Images/icon2.png" alt="Access Icon" />
              <h3 className="font-bold text-base sm:text-lg md:text-xl">Access Past Questions</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-900">Download or view Verified Exams</p>
              <p className="text-xs sm:text-sm md:text-base text-gray-900">Papers From Previous Years</p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center flex-1 min-w-max">
              <img className="w-10 sm:w-12 md:w-14 mb-2 sm:mb-3 md:mb-4 object-cover" src="/Images/icon3.png" alt="Test Icon" />
              <h3 className="font-bold text-base sm:text-lg md:text-xl">Test With Quizzes</h3>
              <p className="text-xs sm:text-sm md:text-base text-gray-900">Practice With Courses Aligned</p>
              <p className="text-xs sm:text-sm md:text-base text-gray-900">Quizzes And Track Your Progress</p>
            </div>
          </div>
        </div>

        {/* Third Container - Tools */}
        <div className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col items-center justify-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 text-center">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-3">Everything You Need To Excel</h1>
            <p className="font-extralight text-sm sm:text-base md:text-lg px-2">Comprehensive academic tools designed especially for university students</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 w-full cursor-pointer">
            {[
              {
                img: "tools1.png",
                title: "Past Question Archive",
                desc: "Reliable PDFs sorted by year, semester, and course code",
              },
              {
                img: "tools2.png",
                title: "Interactive Quizzes",
                desc: "Auto-Graded questions with explanations",
              },
              {
                img: "tools3.png",
                title: "Departmental Structure",
                desc: "Navigate by Faculty - Department - Course - Level",
              },
              {
                img: "tools4.png",
                title: "Anywhere Anytime",
                desc: "Mobile-first, Low-data, offline-friendly access",
              },
              {
                img: "tools5.png",
                title: "Contribute and Earn Recognition",
                desc: "Upload and Share Resources and help Peers",
              },
              {
                img: "tools6.png",
                title: "Tailored for Success",
                desc: "Every resource is specially curated and verified for the universities curriculum and standards",
              },
            ].map((tool, index) => (
              <div
                key={index}
                className="flex flex-col p-3 sm:p-4 md:p-5 shadow-lg rounded-lg sm:rounded-xl md:rounded-2xl hover:scale-105 transition-transform duration-300 bg-white"
              >
                <img className="w-10 sm:w-12 md:w-14 mb-2 sm:mb-3 md:mb-4 object-cover" src={`/Images/${tool.img}`} alt={tool.title} />
                <h3 className="font-bold text-sm sm:text-base md:text-lg text-[#006666]">{tool.title}</h3>
                <p className="text-xs sm:text-sm md:text-base text-gray-900">{tool.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Fourth Container - Testimonials */}
        <div className="max-w-7xl mx-auto w-full rounded-xl sm:rounded-2xl flex flex-wrap flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 gap-6 sm:gap-8 md:gap-10 mb-6 sm:mb-8 md:mb-12">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 md:mb-7">What Students Are Saying</h1>
            <p className="text-lg sm:text-xl md:text-2xl text-[#919191] px-2">
              Join thousands of students who have transformed their study experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 w-full">
            {[
              {
                text: "'Finally, a one-stop platform for university past questions. No more WhatsApp stress'",
                img: "testimonial1.png",
                name: "Amara O.",
                dept: "Computer Science",
                level: "300 level",
              },
              {
                text: "'The quizzes really boosted my confidence before exams. I went from 2.1 to first class!'",
                img: "testimonial2.png",
                name: "Lola A.",
                dept: "Business Administration",
                level: "400 level",
              },
              {
                text: "'Love how everything is organized by department and level. Makes finding resources so easy.'",
                img: "testimonial3.png",
                name: "David M.",
                dept: "Cyber Security",
                level: "200 level",
              },
            ].map((student, i) => (
              <div
                key={i}
                className="bg-white shadow-lg rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col gap-3 sm:gap-4 md:gap-6 hover:scale-105 transition-transform duration-300"
              >
                <p className="text-xs sm:text-sm md:text-base text-[#919191]">{student.text}</p>
                <div className="flex gap-2 items-center">
                  <img className="w-12 sm:w-16 md:w-20 rounded-full" src={`/Images/${student.img}`} alt={student.name} />
                  <div className="text-left">
                    <h2 className="text-sm sm:text-base md:text-lg lg:text-2xl font-bold text-[#006666]">{student.name}</h2>
                    <h3 className="text-xs sm:text-sm md:text-base text-[#121212]">{student.dept}</h3>
                    <p className="text-xs sm:text-sm text-gray-600">{student.level}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fifth Container - CTA */}
        <div className="max-w-7xl mx-auto text-center w-full bg-[#DFECEC] rounded-xl sm:rounded-2xl flex flex-wrap flex-col items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12 mb-6 sm:mb-8 md:mb-12">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#006666] font-bold">Ready to Ace your next</h1>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#006666] font-bold mb-3 sm:mb-4 md:mb-6">exams?</h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#919191] px-4">Join thousands of students already using this platform to</p>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-[#919191] mb-4 sm:mb-5 md:mb-6 px-4">excel in their journey</p>

            {/* CTA Link */}
            <a href="/register" className="flex items-center justify-center text-center px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-[#005366] text-white text-sm sm:text-base md:text-lg shadow-lg rounded-full gap-2 sm:gap-3 hover:bg-[#006666] hover:shadow-2xl transition-all duration-300 font-bold">
              Create a free account
              <img className="w-4 sm:w-5" src="/Images/readyicon.png" alt="Ready Icon" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default MainSection;
