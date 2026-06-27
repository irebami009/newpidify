import React, { useState } from "react";
import { ArrowRight, BookOpen, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./RegisterUser.css";
import { auth, db } from "../../firebase/firebase";
import { signInAnonymously } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

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
      const response = await fetch("http://localhost/pidify/pidify/auth/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
          userType,
          adminKey,
        }),
      });

      const result = await response.json();

      if (result.status === "success") {
        const userData = result.user;

        // Firebase Sync: Log in anonymously and write profile details
        try {
          const userCred = await signInAnonymously(auth);
          await setDoc(doc(db, "users", userCred.user.uid), {
            fullname: userData.fullname,
            email: userData.email,
            faculty: userData.faculty,
            role: userData.role,
            "profile-picture": userData.profile_picture || ""
          });
        } catch (firebaseErr) {
          console.error("Firebase sync error during login:", firebaseErr);
        }

        // Store user details in localStorage
        localStorage.setItem("user", JSON.stringify(userData));

        toast.success(`Welcome back, ${userData.fullname}!`);

        setTimeout(() => {
          if (userType === "student") {
            if (userData.faculty === "FPAS") navigate("/dashboard/fpas");
            else navigate("/dashboard/fsms");
          } else {
            navigate("/dashboard/admin");
          }
        }, 1500);
      } else {
        toast.error(result.message || "Login failed.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed: An error occurred.");
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#f4faf8]">
      <ToastContainer position="top-right" autoClose={3000} />

      <main className="mx-auto grid min-h-screen w-full max-w-7xl items-center gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-12">
        <section className="hidden min-h-[620px] flex-col justify-between rounded-lg bg-[#0e2929] p-8 text-white shadow-2xl shadow-[#123b3b]/20 md:flex">
          <Link to="/" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#006666]">
              <BookOpen size={22} />
            </span>
            <span className="text-2xl font-black">PDIFY</span>
          </Link>

          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm font-bold text-[#bfe9e2]">
              <ShieldCheck size={16} />
              Secure student access
            </p>
            <h1 className="max-w-md text-4xl font-black leading-tight">
              Pick up your study flow where you left off.
            </h1>
            <p className="mt-4 max-w-md text-sm leading-6 text-white/70">
              Log in to access your dashboard, saved faculty resources, announcements, and course materials.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {["Faculty routes", "Past questions", "Quiz practice"].map((item) => (
              <div key={item} className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm font-bold text-white/80">
                {item}
              </div>
            ))}
          </div>
        </section>

        <section className="w-full">
          <div className="mx-auto w-full max-w-xl rounded-lg border border-[#d8e7e5] bg-white p-5 shadow-2xl shadow-[#123b3b]/10 sm:p-7">
            <Link to="/" className="mb-7 inline-flex items-center gap-2 text-sm font-black text-[#006666] md:hidden">
              <BookOpen size={18} />
              PDIFY
            </Link>

            <h2 className="text-3xl font-black text-[#0e2929] sm:text-4xl">Welcome back</h2>
            <p className="mt-2 text-sm leading-6 text-[#536b6b]">Log in to continue to your academic dashboard.</p>

            <form className="mt-7 space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-bold text-[#203535]">Account Type</label>
                <select
                  value={userType}
                  onChange={(e) => setUserType(e.target.value)}
                  className="w-full rounded-lg border border-[#c9dcda] bg-white px-4 py-3 text-sm text-[#203535] outline-none transition focus:border-[#006666] focus:ring-4 focus:ring-[#006666]/10"
                >
                  <option value="student">Student</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div>
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

              {userType === "admin" && (
                <div className="animate-slideDown">
                  <label className="mb-2 block text-sm font-bold text-[#203535]">Admin Access Key</label>
                  <input
                    type="password"
                    placeholder="Enter admin key"
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    required
                    className="w-full rounded-lg border border-[#c9dcda] px-4 py-3 text-sm text-[#203535] outline-none transition placeholder:text-[#9ab0ae] focus:border-[#006666] focus:ring-4 focus:ring-[#006666]/10"
                  />
                </div>
              )}

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#006666] px-4 py-3 font-black text-white shadow-lg shadow-[#006666]/20 transition hover:bg-[#004f4f]"
              >
                Log In
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="mt-5 text-center text-sm text-[#536b6b]">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="font-black text-[#006666] hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LoginUser;
