import React, { useState } from "react";
import { ArrowRight, BookOpen, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./RegisterUser.css";

const RegisterUser = () => {
  const [faculty, setFaculty] = useState("");
  const [userType, setUserType] = useState("student");
  const [passKey, setPassKey] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const OFFICIAL_SECRET = "FPAS2026";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userType === "official" && passKey !== OFFICIAL_SECRET) {
      return toast.error("Invalid Passkey. Access Denied.");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    try {
      const response = await fetch("http://localhost/pidify/pidify/auth/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          password,
          faculty,
          role: userType === "official" ? "official" : "student",
          passKey,
        }),
      });

      const result = await response.json();

      if (result.status === "success") {
        toast.success(result.message || "Registration successful!");
        setTimeout(() => navigate("/login"), 2000);

        setFullname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFaculty("");
        setPassKey("");
      } else {
        toast.error(result.message || "Registration failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#f4faf8]">
      <ToastContainer position="top-right" autoClose={3000} />

      <main className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[0.86fr_1.14fr] lg:px-12">
        <section className="hidden min-h-[700px] flex-col justify-between rounded-lg bg-[#0e2929] p-8 text-white shadow-2xl shadow-[#123b3b]/20 md:flex">
          <Link to="/" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#006666]">
              <BookOpen size={22} />
            </span>
            <span className="text-2xl font-black">PDIFY</span>
          </Link>

          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-bold text-[#bfe9e2]">
              <ShieldCheck size={16} />
              Join your faculty space
            </p>
            <h1 className="max-w-md text-4xl font-black leading-tight">
              Create one account for materials, questions, and updates.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/70">
              Choose your faculty during signup so PDIFY can route you to the right dashboard.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {["FPAS", "FSMS", "Verified files"].map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm font-bold text-white/80">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="w-full">
          <div className="mx-auto w-full max-w-2xl rounded-lg border border-[#d8e7e5] bg-white p-5 shadow-2xl shadow-[#123b3b]/10 sm:p-7">
            <Link to="/" className="mb-7 inline-flex items-center gap-2 text-sm font-black text-[#006666] md:hidden">
              <BookOpen size={18} />
              PDIFY
            </Link>

            <h2 className="text-3xl font-black text-[#0e2929] sm:text-4xl">Create your account</h2>
            <p className="mt-2 text-sm leading-6 text-[#536b6b]">Set up access to the right faculty dashboard.</p>

            <form className="mt-7 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-bold text-[#203535]">Account Type</label>
                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  className="w-full rounded-lg border border-[#c9dcda] bg-white px-4 py-3 text-sm text-[#203535] outline-none transition focus:border-[#006666] focus:ring-4 focus:ring-[#006666]/10"
                >
                  <option value="student">Student</option>
                  <option value="official">Student Official</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-[#203535]">Faculty</label>
                <select
                  value={faculty}
                  onChange={(e) => setFaculty(e.target.value)}
                  required
                  className="w-full rounded-lg border border-[#c9dcda] bg-white px-4 py-3 text-sm text-[#203535] outline-none transition focus:border-[#006666] focus:ring-4 focus:ring-[#006666]/10"
                >
                  <option value="" disabled>Select Faculty</option>
                  <option value="FPAS">FPAS</option>
                  <option value="FSMS">FSMS</option>
                </select>
              </div>

              {userType === "official" && (
                <div className="animate-slideDown sm:col-span-2">
                  <label className="mb-2 block text-sm font-bold text-[#203535]">Official Passkey</label>
                  <input
                    type="password"
                    placeholder="Enter passkey"
                    value={passKey}
                    onChange={(e) => setPassKey(e.target.value)}
                    required
                    className="w-full rounded-lg border border-[#c9dcda] px-4 py-3 text-sm text-[#203535] outline-none transition placeholder:text-[#9ab0ae] focus:border-[#006666] focus:ring-4 focus:ring-[#006666]/10"
                  />
                </div>
              )}

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-bold text-[#203535]">Full Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  required
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="w-full rounded-lg border border-[#c9dcda] px-4 py-3 text-sm text-[#203535] outline-none transition placeholder:text-[#9ab0ae] focus:border-[#006666] focus:ring-4 focus:ring-[#006666]/10"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-bold text-[#203535]">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-[#c9dcda] px-4 py-3 text-sm text-[#203535] outline-none transition placeholder:text-[#9ab0ae] focus:border-[#006666] focus:ring-4 focus:ring-[#006666]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-[#203535]">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-lg border border-[#c9dcda] px-4 py-3 pr-11 text-sm text-[#203535] outline-none transition placeholder:text-[#9ab0ae] focus:border-[#006666] focus:ring-4 focus:ring-[#006666]/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#6b7f7f] transition hover:bg-[#edf8f6] hover:text-[#006666]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-[#203535]">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full rounded-lg border border-[#c9dcda] px-4 py-3 pr-11 text-sm text-[#203535] outline-none transition placeholder:text-[#9ab0ae] focus:border-[#006666] focus:ring-4 focus:ring-[#006666]/10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-[#6b7f7f] transition hover:bg-[#edf8f6] hover:text-[#006666]"
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#006666] px-4 py-3 font-black text-white shadow-lg shadow-[#006666]/20 transition hover:bg-[#004f4f] sm:col-span-2 mt-2"
              >
                Sign Up
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-[#536b6b]">
              Already have an account?{" "}
              <Link to="/login" className="font-black text-[#006666] hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default RegisterUser;
