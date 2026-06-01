import React from 'react';

const IntroFooter = () => {
  return (
    <footer className="bg-[#071212] text-white">
      {/* Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 border-b border-[#ffffff33]">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 sm:gap-12">
        
          {/* Left Side - Description & Icons */}
          <div className="flex flex-col items-start max-w-md">
            <p className="text-sm sm:text-base mb-1">Built for university students by students.</p>
            <p className="text-sm sm:text-base mb-4">Your one-stop platform for academic excellence.</p>

            {/* Social Icons */}
            <div className="flex gap-5">
              <img className="w-5 sm:w-6 h-5 sm:h-6" src="/Images/footericon1.png" alt="Icon 1" />
              <img className="w-5 sm:w-6 h-5 sm:h-6" src="/Images/footericon1.png" alt="Icon 2" />
              <img className="w-5 sm:w-6 h-5 sm:h-6" src="/Images/footericon1.png" alt="Icon 3" />
            </div>
          </div>
          {/* end of left side */}

          {/* Right Side - Links */}
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 md:gap-16 w-full sm:w-auto">
            {/* Column 1 */}
            <div className="flex flex-col gap-2 sm:gap-3">
              <a href="/" className="text-sm sm:text-base hover:underline">Resources</a>
              <a href="/past-questions" className="text-sm sm:text-base hover:underline">Past Questions</a>
              <a href="/quiz" className="text-sm sm:text-base hover:underline">Quizzes</a>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-2 sm:gap-3">
              <a href="#" className="text-sm sm:text-base hover:underline">Academic Integrity</a>
              <a href="#" className="text-sm sm:text-base hover:underline">FAQs</a>
              <a href="#" className="text-sm sm:text-base hover:underline">Privacy Policy</a>
              <a href="#" className="text-sm sm:text-base hover:underline">T&C</a>
            </div>
          </div>
          {/* end of right side */}
        </div>
      </div>
      {/* end of footer */}
      <p className="text-center text-xs sm:text-sm text-[#656C6C] py-4 sm:py-6 px-4">© 2025 PDIFY. Powered by SamyTech Digital Concept.</p>
    </footer>
  );
};

export default IntroFooter;
