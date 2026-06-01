import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { doc, getDoc } from "firebase/firestore";
import "./RegisterUser.css";

const AnimatedHuman = () => {
  return (
    <div className="hidden lg:flex items-center justify-center h-full">
      <svg
        viewBox="0 0 200 450"
        className="w-80 h-full max-h-screen animate-float"
        style={{
          filter: "drop-shadow(0 10px 30px rgba(0, 102, 102, 0.3))",
        }}
      >
        {/* Neck */}
        <rect
          x="95"
          y="82"
          width="10"
          height="8"
          fill="#F4A460"
        />

        {/* Head */}
        <circle cx="100" cy="60" r="22" fill="#F4A460" className="animate-head-float" />

        {/* Hair - Full head cover */}
        <path
          d="M 80 50 Q 75 35 100 30 Q 125 35 120 50 Q 120 45 100 42 Q 80 45 80 50"
          fill="#8B4513"
          className="animate-hair-sway"
        />

        {/* Hair highlights */}
        <ellipse
          cx="95"
          cy="38"
          rx="15"
          ry="8"
          fill="#A0522D"
          opacity="0.5"
          className="animate-hair-sway"
        />

        {/* Shoulders */}
        <ellipse
          cx="100"
          cy="88"
          rx="28"
          ry="10"
          fill="#4A7C7C"
          className="animate-shoulder"
        />

        {/* Body */}
        <path
          d="M 80 95 L 75 140 Q 75 145 80 145 L 120 145 Q 125 145 125 140 L 120 95 Z"
          fill="#1E90FF"
          className="animate-body-float"
        />

        {/* Left Arm */}
        <g className="animate-arm-left" style={{ transformOrigin: "78px 98px" }}>
          <rect
            x="50"
            y="95"
            width="28"
            height="14"
            rx="7"
            fill="#F4A460"
          />
          {/* Left Hand */}
          <circle cx="50" cy="102" r="8" fill="#F4A460" />
          <circle cx="48" cy="99" r="2" fill="#8B4513" />
        </g>

        {/* Right Arm */}
        <g className="animate-arm-right" style={{ transformOrigin: "122px 98px" }}>
          <rect
            x="122"
            y="95"
            width="28"
            height="14"
            rx="7"
            fill="#F4A460"
          />
          {/* Right Hand */}
          <circle cx="150" cy="102" r="8" fill="#F4A460" />
          <circle cx="152" cy="99" r="2" fill="#8B4513" />
        </g>

        {/* Left Leg */}
        <g className="animate-leg-left" style={{ transformOrigin: "85px 145px" }}>
          <rect
            x="80"
            y="145"
            width="10"
            height="38"
            rx="5"
            fill="#2C3E50"
          />
          {/* Left Foot */}
          <ellipse cx="85" cy="185" rx="8" ry="6" fill="#1A1A1A" />
        </g>

        {/* Right Leg */}
        <g className="animate-leg-right" style={{ transformOrigin: "115px 145px" }}>
          <rect
            x="110"
            y="145"
            width="10"
            height="38"
            rx="5"
            fill="#2C3E50"
          />
          {/* Right Foot */}
          <ellipse cx="115" cy="185" rx="8" ry="6" fill="#1A1A1A" />
        </g>

        {/* Eyes - Left */}
        <circle cx="92" cy="56" r="2.5" fill="#333" className="animate-blink" />
        <circle cx="93" cy="55" r="1" fill="#fff" />

        {/* Eyes - Right */}
        <circle cx="108" cy="56" r="2.5" fill="#333" className="animate-blink" />
        <circle cx="109" cy="55" r="1" fill="#fff" />

        {/* Nose */}
        <path d="M 100 58 L 99 63 L 101 63" stroke="#D4A574" strokeWidth="1.5" fill="none" />

        {/* Smile */}
        <path d="M 94 66 Q 100 69 106 66" stroke="#333" strokeWidth="2" fill="none" strokeLinecap="round" />

        {/* Blush */}
        <circle cx="82" cy="62" r="3" fill="#FFB6C1" opacity="0.6" />
        <circle cx="118" cy="62" r="3" fill="#FFB6C1" opacity="0.6" />

        {/* Sparkles - Contextual stars */}
        <circle cx="160" cy="70" r="1.5" fill="#FFD700" className="animate-sparkle" />
        <circle cx="35" cy="100" r="1.5" fill="#FFD700" className="animate-sparkle" style={{ animationDelay: "0.5s" }} />
        <circle cx="170" cy="140" r="1.5" fill="#FFD700" className="animate-sparkle" style={{ animationDelay: "1s" }} />
        <circle cx="25" cy="150" r="1.5" fill="#00D4FF" className="animate-sparkle" style={{ animationDelay: "0.7s" }} />
      </svg>
    </div>
  );
};

const LoginUser = () => {
  const [userType, setUserType] = useState("student");
  const [adminKey, setAdminKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const ADMIN_SECRET = "Samytech99";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userType === "admin" && adminKey !== ADMIN_SECRET) {
      return toast.error("Invalid Admin Key. Access Denied.");
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user info from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) {
        return toast.error("User data not found!");
      }

      const userData = userDoc.data();

      toast.success(`Welcome back, ${userData.fullname}!`);

      setTimeout(() => {
        if (userType === "student") {
          if (userData.faculty === "FPAS") navigate("/dashboard/fpas");
          else navigate("/dashboard/fsms");
        } else {
          navigate("/dashboard/admin");
        }
      }, 1500);
    } catch (error) {
      console.error(error);
      toast.error("Login failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#004d4d] via-[#006666] to-[#003d3d] flex flex-col overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#00a3a3] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0099cc] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      
      <ToastContainer position="top-right" autoClose={3000} />

      <main className="flex flex-1 items-center justify-center px-3 py-6 sm:py-8 md:py-10 relative z-10 w-full">
        <div className="w-full max-w-4xl lg:max-w-5xl flex flex-col lg:flex-row gap-6 lg:gap-8 items-center lg:items-stretch">
          {/* Animated Human Figure - Left Side */}
          <div className="w-full lg:w-2/5 flex justify-center lg:justify-start items-center hidden md:flex">
            <div className="w-full max-w-xs lg:max-w-md">
              <AnimatedHuman />
            </div>
          </div>

          {/* Login Form - Right Side */}
          <div className="w-full lg:w-3/5 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-4 sm:p-6 md:p-7 border border-white/20 h-fit">

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-1 sm:mb-2">
              Welcome Back To <span className="text-[#006666]">P-DIFY</span>
            </h2>
            <p className="text-center text-gray-600 mb-3 sm:mb-4 text-xs sm:text-sm">Log in to your account</p>

            <form className="space-y-2 sm:space-y-2.5 md:space-y-5" onSubmit={handleSubmit}>

              {/* ACCOUNT TYPE */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Account Type</label>
                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:border-[#006666] focus:outline-none transition-colors bg-white text-xs sm:text-sm"
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:border-[#006666] focus:outline-none transition-colors text-xs sm:text-sm"
                />
              </div>

              {/* PASSWORD */}
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:border-[#006666] focus:outline-none transition-colors pr-10 text-xs sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-[#006666] transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* ADMIN ACCESS KEY */}
              {userType === "admin" && (
                <div className="animate-slideDown">
                  <label className="block text-xs sm:text-sm font-semibold text-gray-700 mb-1">Admin Access Key</label>
                  <input
                    type="password"
                    placeholder="Enter admin key"
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    required
                    className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:border-[#006666] focus:outline-none transition-colors text-xs sm:text-sm"
                  />
                </div>
              )}

              {/* SUBMIT */}
              <button
                type="submit"
                className="w-full py-2 sm:py-2.5 bg-gradient-to-r from-[#006666] to-[#004d4d] text-white rounded-lg font-bold text-sm sm:text-base hover:shadow-lg transform hover:scale-105 transition-all duration-200 mt-3 sm:mt-4"
              >
                Log In
              </button>

            </form>

            <p className="text-center mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <a href="/register" className="text-[#006666] font-bold hover:underline">
                Sign up
              </a>
            </p>

          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginUser;