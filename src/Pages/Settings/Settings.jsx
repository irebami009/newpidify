import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import FpasSidebar from "../../component/FpasSidebar";
import FsmsSidebar from "../../component/FsmsSidebar";
import { applyTheme, getStoredTheme, saveTheme } from "../../utils/theme";
import {
  User,
  Shield,
  Bell,
  Save,
  Eye,
  EyeOff,
  UserCheck,
  Mail,
  Building,
  GraduationCap,
} from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();

  // Load user info from localStorage
  const [user, setUser] = useState(() => {
    try {
      const localUser = localStorage.getItem("user");
      return localUser ? JSON.parse(localUser) : null;
    } catch (e) {
      return null;
    }
  });

  // Redirect to login if user not found
  useEffect(() => {
    if (!user) {
      toast.error("Please login to access settings.");
      navigate("/login");
    }
  }, [user, navigate]);

  // Tab State
  const [activeTab, setActiveTab] = useState("profile");

  // Profile Form States
  const [fullname, setFullname] = useState(user?.fullname || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Profile Picture State
  const [profilePicture, setProfilePicture] = useState(() => {
    if (user) {
      return user.profile_picture || localStorage.getItem(`profile_pic_${user.id}`) || "";
    }
    return "";
  });

  // Password Form States
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);

  // Preference States
  const [prefAnnouncements, setPrefAnnouncements] = useState(() => {
    if (user) {
      const val = localStorage.getItem(`pref_announcements_${user.id}`);
      return val !== null ? val === "true" : true;
    }
    return true;
  });
  const [prefTimetable, setPrefTimetable] = useState(() => {
    if (user) {
      const val = localStorage.getItem(`pref_timetable_${user.id}`);
      return val !== null ? val === "true" : true;
    }
    return true;
  });
  const [prefWeeklyEmail, setPrefWeeklyEmail] = useState(() => {
    if (user) {
      const val = localStorage.getItem(`pref_weekly_email_${user.id}`);
      return val !== null ? val === "true" : false;
    }
    return false;
  });
  const [appTheme, setAppTheme] = useState(() => getStoredTheme(user));

  // Load and apply theme on startup
  useEffect(() => {
    if (user) {
      const savedTheme = getStoredTheme(user);
      setAppTheme(savedTheme);
      applyTheme(savedTheme);
    }
  }, [user]);

  const handleThemeSelect = (theme) => {
    setAppTheme(theme);
    saveTheme(theme, user);
  };

  if (!user) return null;

  const isFpas = user.faculty?.toLowerCase() === "fpas";

  // Handle Profile Update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!fullname || !email) {
      return toast.error("Full Name and Email are required.");
    }

    setIsSavingProfile(true);
    try {
      const response = await fetch("http://localhost/pidify/pidify/auth/update_profile.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          fullname,
          email,
        }),
      });

      const result = await response.json();
      if (result.status === "success") {
        localStorage.setItem("user", JSON.stringify(result.user));
        setUser(result.user);
        toast.success("Profile updated successfully!");
        
        // Force sidebars/dashboards to re-render changes
        window.dispatchEvent(new Event("storage"));
      } else {
        toast.error(result.message || "Failed to update profile.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSavingProfile(false);
    }
  };

  // Handle Password Change
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      return toast.error("All password fields are required.");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("New passwords do not match.");
    }

    if (newPassword.length < 6) {
      return toast.error("New password must be at least 6 characters long.");
    }

    setIsUpdatingPassword(true);
    try {
      const response = await fetch("http://localhost/pidify/pidify/auth/update_profile.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          fullname: user.fullname,
          email: user.email,
          currentPassword,
          newPassword,
        }),
      });

      const result = await response.json();
      if (result.status === "success") {
        toast.success("Password changed successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(result.message || "Failed to update password.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  // Handle Avatar Change
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("userId", user.id);
      formData.append("avatar", file);

      const response = await fetch("http://localhost/pidify/pidify/auth/upload_avatar.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.status === "success") {
        const updatedUser = { ...user, profile_picture: result.profile_picture };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
        setProfilePicture(result.profile_picture);
        toast.success("Avatar updated successfully!");
        
        // Sync change instantly across other components
        window.dispatchEvent(new Event("storage"));
      } else {
        toast.error(result.message || "Failed to upload avatar.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload avatar image.");
    }
  };

  // Save Preferences locally
  const handleSavePreferences = (e) => {
    e.preventDefault();
    localStorage.setItem(`pref_announcements_${user.id}`, prefAnnouncements);
    localStorage.setItem(`pref_timetable_${user.id}`, prefTimetable);
    localStorage.setItem(`pref_weekly_email_${user.id}`, prefWeeklyEmail);
    saveTheme(appTheme, user);
    toast.success("Preferences saved successfully!");
  };

  const tabs = [
    { id: "profile", label: "Profile Details", icon: User },
    { id: "security", label: "Password & Security", icon: Shield },
    { id: "preferences", label: "Preferences & UI", icon: Bell },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 w-full overflow-x-hidden transition-colors duration-300">
      {/* Sidebar based on user faculty */}
      {isFpas ? <FpasSidebar /> : <FsmsSidebar />}

      {/* Main Content Area */}
      <div className="flex-1 ml-0 md:ml-64 transition-all duration-300 pt-16 md:pt-8 px-4 md:px-8 pb-12">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="bg-white rounded-2xl p-6 shadow-md transition-colors duration-300">
            <h1 className="text-2xl md:text-3xl font-black text-gray-800">
              Account Settings
            </h1>
            <p className="text-sm text-gray-600 mt-1.5">
              Customize your profile, configure security credentials, and set notification parameters.
            </p>

            {/* Tab navigation */}
            <div className="flex border-b border-gray-200 mt-6 gap-2 overflow-x-auto pb-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 py-3 px-4 font-bold text-sm rounded-t-xl transition-all whitespace-nowrap shrink-0 ${
                      activeTab === tab.id
                        ? "border-b-2 border-[#006666] text-[#006666] bg-[#edf8f6]"
                        : "text-gray-600 hover:text-[#006666] hover:bg-gray-50"
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content Panels */}
          <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 min-h-[400px] transition-colors duration-300">
            
            {/* PROFILE TAB */}
            {activeTab === "profile" && (
              <div className="space-y-8 animate-fadeIn">
                {/* Profile Picture Card */}
                <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-gray-200">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-2xl bg-[#006666] flex items-center justify-center text-white text-3xl font-black overflow-hidden shadow-md shadow-[#006666]/20 border-2 border-white">
                      {profilePicture ? (
                        <img src={profilePicture} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        fullname ? fullname.charAt(0).toUpperCase() : "S"
                      )}
                    </div>
                    <label className="absolute -bottom-2 -right-2 bg-gradient-to-tr from-[#006666] to-[#008080] hover:from-[#004f4f] hover:to-[#006666] text-white p-2 rounded-xl cursor-pointer shadow-md transition text-xs font-bold border border-white">
                      Change
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <div className="text-center sm:text-left space-y-1">
                    <h3 className="text-lg font-bold text-gray-800">Profile Image</h3>
                    <p className="text-xs text-gray-600 max-w-sm">
                      Upload a JPEG or PNG image. Recommended dimensions are 150x150 pixels.
                    </p>
                  </div>
                </div>

                {/* Profile Form */}
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    {/* Full Name */}
                    <div>
                      <label className="mb-2 block text-sm font-bold text-gray-700 flex items-center gap-1.5">
                        <UserCheck size={16} className="text-[#006666]" /> Full Name
                      </label>
                      <input
                        type="text"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#006666] focus:ring-4 focus:ring-[#006666]/10"
                        placeholder="Enter full name"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="mb-2 block text-sm font-bold text-gray-700 flex items-center gap-1.5">
                        <Mail size={16} className="text-[#006666]" /> Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-[#006666] focus:ring-4 focus:ring-[#006666]/10"
                        placeholder="your@email.com"
                      />
                    </div>

                    {/* Faculty (Read Only) */}
                    <div>
                      <label className="mb-2 block text-sm font-bold text-gray-700 flex items-center gap-1.5">
                        <Building size={16} className="text-gray-500" /> Faculty (Assigned)
                      </label>
                      <input
                        type="text"
                        value={user.faculty || ""}
                        disabled
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 cursor-not-allowed outline-none font-bold"
                      />
                    </div>

                    {/* Role (Read Only) */}
                    <div>
                      <label className="mb-2 block text-sm font-bold text-gray-700 flex items-center gap-1.5">
                        <GraduationCap size={16} className="text-gray-500" /> Account Role
                      </label>
                      <input
                        type="text"
                        value={(user.role || "student").toUpperCase()}
                        disabled
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-500 cursor-not-allowed outline-none font-bold"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 flex justify-end">
                    <button
                      type="submit"
                      disabled={isSavingProfile}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#006666] hover:bg-[#004f4f] px-6 py-3 font-bold text-white shadow-md shadow-[#006666]/10 transition disabled:opacity-50"
                    >
                      <Save size={16} />
                      {isSavingProfile ? "Saving..." : "Save Profile Details"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* SECURITY TAB */}
            {activeTab === "security" && (
              <div className="space-y-6 animate-fadeIn">
                <h3 className="text-lg font-bold text-gray-800">Change Password</h3>
                <p className="text-sm text-gray-600">
                  Ensure your credentials are long, randomized, and kept confidential to protect your dashboard resources.
                </p>

                <form onSubmit={handleUpdatePassword} className="space-y-5 mt-4">
                  {/* Current Password */}
                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700">Current Password</label>
                    <div className="relative">
                      <input
                        type={showCurrentPassword ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-11 text-sm text-gray-700 outline-none transition focus:border-[#006666] focus:ring-4 focus:ring-[#006666]/10"
                        placeholder="********"
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-500 hover:text-[#006666]"
                      >
                        {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700">New Password</label>
                    <div className="relative">
                      <input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-11 text-sm text-gray-700 outline-none transition focus:border-[#006666] focus:ring-4 focus:ring-[#006666]/10"
                        placeholder="********"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-500 hover:text-[#006666]"
                      >
                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm New Password */}
                  <div>
                    <label className="mb-2 block text-sm font-bold text-gray-700">Confirm New Password</label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 pr-11 text-sm text-gray-700 outline-none transition focus:border-[#006666] focus:ring-4 focus:ring-[#006666]/10"
                        placeholder="********"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-gray-500 hover:text-[#006666]"
                      >
                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200 flex justify-end">
                    <button
                      type="submit"
                      disabled={isUpdatingPassword}
                      className="inline-flex items-center gap-2 rounded-xl bg-[#006666] hover:bg-[#004f4f] px-6 py-3 font-bold text-white shadow-md shadow-[#006666]/10 transition disabled:opacity-50"
                    >
                      <Save size={16} />
                      {isUpdatingPassword ? "Updating..." : "Update Password"}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* PREFERENCES & UI TAB */}
            {activeTab === "preferences" && (
              <form onSubmit={handleSavePreferences} className="space-y-8 animate-fadeIn">
                
                {/* Notification preferences */}
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-800">Notification Toggles</h3>
                  <p className="text-sm text-gray-600">
                    Manage the notifications and email alerts you want to receive.
                  </p>

                  <div className="space-y-3 mt-4">
                    {/* Announcement toggle */}
                    <label className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer transition">
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-gray-800">Announcements alerts</p>
                        <p className="text-xs text-gray-600">Get notified when new department messages are posted.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={prefAnnouncements}
                        onChange={(e) => setPrefAnnouncements(e.target.checked)}
                        className="accent-[#006666] w-4 h-4 cursor-pointer"
                      />
                    </label>

                    {/* Timetable change toggle */}
                    <label className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer transition">
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-gray-800">Timetable updates</p>
                        <p className="text-xs text-gray-600">Receive alerts for schedule modifications and room changes.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={prefTimetable}
                        onChange={(e) => setPrefTimetable(e.target.checked)}
                        className="accent-[#006666] w-4 h-4 cursor-pointer"
                      />
                    </label>

                    {/* Weekly digest toggle */}
                    <label className="flex items-center justify-between p-4 rounded-xl border border-gray-200 hover:bg-gray-50 cursor-pointer transition">
                      <div className="space-y-0.5">
                        <p className="text-sm font-bold text-gray-800">Weekly Email digest</p>
                        <p className="text-xs text-gray-600">Get a weekly email of course materials and announcements.</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={prefWeeklyEmail}
                        onChange={(e) => setPrefWeeklyEmail(e.target.checked)}
                        className="accent-[#006666] w-4 h-4 cursor-pointer"
                      />
                    </label>
                  </div>
                </div>

                {/* Theme Selector */}
                <div className="space-y-4 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-bold text-gray-800">App Theme Mode</h3>
                  <p className="text-sm text-gray-600">
                    Adjust your interface colors to reduce eye fatigue.
                  </p>

                  <div className="grid grid-cols-3 gap-4 mt-3">
                    {/* Light option */}
                    <button
                      type="button"
                      onClick={() => handleThemeSelect("light")}
                      className={`flex flex-col items-center gap-2 p-3.5 rounded-xl border transition text-center ${
                        appTheme === "light"
                          ? "border-[#006666] bg-[#edf8f6] text-[#006666]"
                          : "border-gray-200 hover:bg-gray-50 text-gray-600"
                      }`}
                    >
                      <div className="w-full h-8 bg-white border border-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-[10px] text-gray-400">Light UI</span>
                      </div>
                      <span className="text-xs font-bold">Light</span>
                    </button>

                    {/* Dark option */}
                    <button
                      type="button"
                      onClick={() => handleThemeSelect("dark")}
                      className={`flex flex-col items-center gap-2 p-3.5 rounded-xl border transition text-center ${
                        appTheme === "dark"
                          ? "border-[#006666] bg-[#edf8f6] text-[#006666]"
                          : "border-gray-200 hover:bg-gray-50 text-gray-600"
                      }`}
                    >
                      <div className="w-full h-8 bg-[#0e2929] border border-[#0e2929] rounded-lg flex items-center justify-center">
                        <span className="text-[10px] text-[#9dd8cf]">Dark UI</span>
                      </div>
                      <span className="text-xs font-bold">Dark</span>
                    </button>

                    {/* System option */}
                    <button
                      type="button"
                      onClick={() => handleThemeSelect("system")}
                      className={`flex flex-col items-center gap-2 p-3.5 rounded-xl border transition text-center ${
                        appTheme === "system"
                          ? "border-[#006666] bg-[#edf8f6] text-[#006666]"
                          : "border-gray-200 hover:bg-gray-50 text-gray-600"
                      }`}
                    >
                      <div className="w-full h-8 bg-gradient-to-r from-white to-[#0e2929] border border-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-[8px] text-gray-500 font-bold bg-white/70 px-1 rounded">Auto</span>
                      </div>
                      <span className="text-xs font-bold">System</span>
                    </button>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-xl bg-[#006666] hover:bg-[#004f4f] px-6 py-3 font-bold text-white shadow-md shadow-[#006666]/10 transition"
                  >
                    <Save size={16} />
                    Save Preferences
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default Settings;
