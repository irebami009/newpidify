import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { Bell, User } from "lucide-react";
import { auth, db, storage } from "../../firebase/firebase";
import {
  doc,
  getDoc,
  updateDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Fpas = () => {
  const [studentName, setStudentName] = useState(() => {
    try {
      const localUser = localStorage.getItem("user");
      if (localUser) {
        const parsed = JSON.parse(localUser);
        return parsed.fullname || "";
      }
    } catch (e) {
      console.error("Error parsing local user", e);
    }
    return "";
  });
  const [profilePicture, setProfilePicture] = useState(() => {
    try {
      const localUser = localStorage.getItem("user");
      if (localUser) {
        const parsed = JSON.parse(localUser);
        return parsed.profile_picture || localStorage.getItem(`profile_pic_${parsed.id}`) || "";
      }
    } catch (e) {
      console.error(e);
    }
    return "";
  });
  const [loading, setLoading] = useState(true);

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const fileInputRef = useRef(null);

  // Storage listener to update name and profile picture in real-time
  useEffect(() => {
    const handleStorage = () => {
      try {
        const localUserStr = localStorage.getItem("user");
        if (localUserStr) {
          const data = JSON.parse(localUserStr);
          if (data) {
            setStudentName(data.fullname || "");
            setProfilePicture(data.profile_picture || localStorage.getItem(`profile_pic_${data.id}`) || "");
          }
        }
      } catch (e) {
        console.error("Storage sync error", e);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // ================= AUTH + USER DATA =================
  useEffect(() => {
    const localUserStr = localStorage.getItem("user");
    if (localUserStr) {
      try {
        const data = JSON.parse(localUserStr);
        if (data && data.fullname) {
          // ✅ PRODUCTION SAFE FACULTY CHECK
          if ((data.faculty || "").toLowerCase() !== "fpas") {
            window.location.href = "/login"; // redirect if wrong faculty
            return;
          }
          setStudentName(data.fullname);
          const pic = data.profile_picture || localStorage.getItem(`profile_pic_${data.id}`) || "";
          setProfilePicture(pic);
          setLoading(false);
          return;
        }
      } catch (error) {
        console.error("Local user fetch error:", error);
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));

        if (userDoc.exists()) {
          const data = userDoc.data();

          // ✅ PRODUCTION SAFE FACULTY CHECK
          if ((data.faculty || "").toLowerCase() !== "fpas") {
            window.location.href = "/login"; // redirect if wrong faculty
            return;
          }

          setStudentName(data.fullname || "Student");
          setProfilePicture(data["profile-picture"] || "");
        }
      } catch (error) {
        console.error("User fetch error:", error);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ================= NOTIFICATIONS =================
  useEffect(() => {
    const q = query(
      collection(db, "notifications", "fpas", "items"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNotifications(data);
      setUnreadCount(data.filter((n) => !n.read).length);
    });

    return () => unsubscribe();
  }, []);

  // ================= MARK AS READ =================
  const markAllAsRead = async () => {
    try {
      await Promise.all(
        notifications.map((note) => {
          if (!note.read) {
            return updateDoc(
              doc(db, "notifications", "fpas", "items", note.id),
              { read: true }
            );
          }
        })
      );
      setUnreadCount(0);
    } catch (error) {
      console.error(error);
    }
  };

  // ================= PROFILE UPLOAD =================
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const localUserStr = localStorage.getItem("user");
    if (localUserStr) {
      try {
        const localUser = JSON.parse(localUserStr);
        const formData = new FormData();
        formData.append("userId", localUser.id);
        formData.append("avatar", file);

        const response = await fetch("http://localhost/pidify/pidify/auth/upload_avatar.php", {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        if (result.status === "success") {
          const updatedUser = { ...localUser, profile_picture: result.profile_picture };
          localStorage.setItem("user", JSON.stringify(updatedUser));
          setProfilePicture(result.profile_picture);
          toast.success("Profile picture updated!");
          window.dispatchEvent(new Event("storage"));
        } else {
          toast.error(result.message || "Failed to upload picture.");
        }
        return;
      } catch (err) {
        console.error("PHP profile pic save error:", err);
        toast.error("Failed to upload profile picture.");
        return;
      }
    }

    const user = auth.currentUser;
    if (!user) return;

    try {
      const storageRef = ref(storage, `profile-pictures/${user.uid}`);

      await uploadBytes(storageRef, file);

      let url = await getDownloadURL(storageRef);
      url += `?t=${Date.now()}`;

      await updateDoc(doc(db, "users", user.uid), {
        "profile-picture": url,
      });

      setProfilePicture(url);
      toast.success("Profile picture updated!");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload profile picture.");
    }
  };

  const handleIconClick = () => fileInputRef.current?.click();

  // ================= LOADING SCREEN =================
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100 w-full overflow-x-hidden">
      <div className="flex-1 flex flex-col w-full min-w-0">

        {/* NAVBAR */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between bg-white shadow-md px-4 md:px-8 py-4 w-full relative">

          <div className="w-full md:w-auto">
            <h1 className="text-lg md:text-xl font-semibold text-gray-700">
              Faculty of Pure and Applied Sciences (FPAS) Dashboard
            </h1>
          </div>

          <div className="flex items-center justify-between md:justify-end mt-3 md:mt-0 gap-4 md:gap-6 w-full md:w-auto">

            {/* NOTIFICATION */}
            <div className="relative">
              <button
                onClick={() => {
                  const next = !showNotifications;
                  setShowNotifications(next);
                  if (next) markAllAsRead();
                }}
              >
                <Bell className="w-6 h-6 text-gray-600" />

                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-64 sm:w-72 md:w-80 max-w-[calc(100vw-2rem)] bg-white shadow-lg rounded-lg p-3 z-50">
                  <h3 className="font-semibold mb-2 text-gray-700">
                    Notifications
                  </h3>

                  {notifications.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No notifications yet
                    </p>
                  ) : (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {notifications.map((note) => (
                        <div
                          key={note.id}
                          className="text-sm p-2 bg-gray-100 rounded-md"
                        >
                          {note.message}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* USER */}
            <div className="flex items-center gap-2 md:gap-3">
              <span className="text-gray-700 font-medium text-sm md:text-base">
                Hi, {studentName} 
              </span>

              <div
                className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer overflow-hidden"
                onClick={handleIconClick}
              >
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-5 h-5 text-gray-600" />
                )}
              </div>

              <input
                type="file"
                hidden
                ref={fileInputRef}
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

          </div>
        </header>

        {/* CONTENT */}
        <main className="flex-1 flex flex-col p-4 md:p-8 overflow-x-hidden overflow-y-auto w-full min-w-0">

          <section className="bg-white rounded-2xl shadow-md p-6 md:p-8 mb-8">
            <h1 className="text-2xl md:text-2xl font-bold text-gray-800 mb-2">
              Welcome back, {studentName}! 
            </h1>

            <p className="text-gray-600">
              You’re logged into the{" "}
              <span className="font-semibold text-blue-600">Department</span>{" "}
              Dashboard under FPAS.
            </p>
          </section>

          <section className="bg-white rounded-2xl shadow-md p-5 overflow-hidden">

            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Dashboard Overview
            </h2>

            <p className="text-gray-600 mb-4">
              From here, you can access your course materials, past questions, and quizzes across all levels. Stay organized and ahead in your studies.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 w-full min-w-0">

              <div className="bg-blue-50 p-6 rounded-xl shadow-sm hover:shadow-md transition min-w-0">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">
                  Course Materials
                </h3>
                <p className="text-gray-600">
                  Browse lecture notes and handouts across all levels.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-xl shadow-sm hover:shadow-md transition min-w-0">
                <h3 className="text-lg font-semibold text-green-700 mb-2">
                  Past Questions
                </h3>
                <p className="text-gray-600">
                  Practice with real exam questions to prepare effectively.
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-xl shadow-sm hover:shadow-md transition min-w-0">
                <h3 className="text-lg font-semibold text-yellow-700 mb-2">
                  Quizzes
                </h3>
                <p className="text-gray-600">
                  Test your knowledge with interactive quizzes.
                </p>
              </div>

            </div>

          </section>

        </main>
      </div>
    </div>
  );
};

export default Fpas;