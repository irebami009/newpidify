import React, { useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { Bell, User } from "lucide-react";
import { auth, db, storage } from "../firebase/firebase";
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
import { motion, AnimatePresence } from "framer-motion";

const FsmsTimetable = () => {
  const [studentName, setStudentName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [loading, setLoading] = useState(true);

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const fileInputRef = useRef(null);

  // ✅ AUTO OPEN TODAY
  const getToday = () => {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return days[new Date().getDay()];
  };

  const [openDay, setOpenDay] = useState(getToday());

  // ================= TIMETABLE DATA =================
  const timeSlots = ["8-10", "10-12", "12-2"];

  const timetableData = [
    {
      day: "Monday",
      "8-10": {
        courses: [
          { name: "BUS 201", lecturer: "Dr. Adebayo" },
          { name: "MGT 301", lecturer: "Prof. Okon" },
        ],
        venue: "LT1",
      },
      "10-12": {
        courses: [{ name: "ACC 101", lecturer: "Dr. Ibrahim" }],
        venue: "LT2",
      },
      "12-2": null,
    },

    {
      day: "Tuesday",
      "8-10": null,
      "10-12": {
        courses: [{ name: "ECO 201", lecturer: "Dr. Fatima" }],
        venue: "LT1",
      },
      "12-2": {
        courses: [{ name: "STA 101", lecturer: "Prof. Ahmed" }],
        venue: "LAB1",
      },
    },

    {
      day: "Wednesday",
      "8-10": {
        courses: [{ name: "BUS 201", lecturer: "Dr. Adebayo" }],
        venue: "LT1",
      },
      "10-12": null,
      "12-2": {
        courses: [{ name: "MGT 301", lecturer: "Prof. Okon" }],
        venue: "LT2",
      },
    },

    {
      day: "Thursday",
      "8-10": null,
      "10-12": {
        courses: [{ name: "ACC 101", lecturer: "Dr. Ibrahim" }],
        venue: "LT1",
      },
      "12-2": {
        courses: [{ name: "ECO 201", lecturer: "Dr. Fatima" }],
        venue: "LAB1",
      },
    },

    {
      day: "Friday",
      "8-10": {
        courses: [{ name: "STA 101", lecturer: "Prof. Ahmed" }],
        venue: "LT1",
      },
      "10-12": null,
      "12-2": {
        courses: [{ name: "BUS 201", lecturer: "Dr. Adebayo" }],
        venue: "LT2",
      },
    },
  ];

  // ================= AUTH =================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      const userDoc = await getDoc(doc(db, "users", user.uid));

      if (userDoc.exists()) {
        const data = userDoc.data();

        if ((data.faculty || "").toLowerCase() !== "fsms") {
          window.location.href = "/login";
          return;
        }

        setStudentName(data.fullname || "Student");
        setProfilePicture(data["profile-picture"] || "");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // ================= NOTIFICATIONS =================
  useEffect(() => {
    const q = query(
      collection(db, "notifications", "fsms", "items"),
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

  const markAllAsRead = async () => {
    await Promise.all(
      notifications.map((note) => {
        if (!note.read) {
          return updateDoc(
            doc(db, "notifications", "fsms", "items", note.id),
            { read: true }
          );
        }
      })
    );
    setUnreadCount(0);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const user = auth.currentUser;
    if (!user) return;

    const storageRef = ref(storage, `profile-pictures/${user.uid}`);
    await uploadBytes(storageRef, file);

    let url = await getDownloadURL(storageRef);
    url += `?t=${Date.now()}`;

    await updateDoc(doc(db, "users", user.uid), {
      "profile-picture": url,
    });

    setProfilePicture(url);
  };

  const handleIconClick = () => fileInputRef.current?.click();

  return (
     <div className="flex min-h-screen bg-gray-100 w-full overflow-x-hidden">
          <div className="flex-1 flex flex-col w-full min-w-0">
    
            {/* NAVBAR */}
            <header className="flex flex-col md:flex-row md:items-center md:justify-between bg-white shadow-md px-4 md:px-8 py-4 w-full relative">
    
              <div className="w-full md:w-auto">
                <h1 className="text-lg md:text-xl font-semibold text-gray-700">
                  Faculty of Science and Management Studies (FSMS) Dashboard
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
                    Hi, {studentName} 👋
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
    

        {/* ================= TIMETABLE (ONLY MODIFIED PART) ================= */}
        <main className="p-4 md:p-8">

          <h2 className="text-2xl font-bold mb-6 text-[#006666]">
            📅 Timetable
          </h2>

          <div className="space-y-4">

            {timetableData.map((row, i) => {
              const isOpen = openDay === row.day;

              return (
                <div key={i} className="bg-white rounded-xl shadow border">

                  {/* DAY HEADER */}
                  <button
                    onClick={() => setOpenDay(isOpen ? null : row.day)}
                    className="w-full flex justify-between items-center p-4 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{row.day}</span>

                      {row.day === getToday() && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          Today
                        </span>
                      )}
                    </div>

                    <span>{isOpen ? "▲" : "▼"}</span>
                  </button>

                  {/* DROPDOWN */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden border-t bg-gray-50"
                      >
                        <div className="p-4 space-y-3">

                          {timeSlots.map((time, j) => {
                            const slot = row[time];
                            if (!slot) return null;

                            return (
                              <div
                                key={j}
                                className="bg-white p-3 rounded-lg border"
                              >
                                <div className="text-xs text-gray-500 mb-2">
                                  ⏰ {time} • 📍 {slot.venue}
                                </div>

                                {slot.courses?.map((c, k) => (
                                  <div key={k}>
                                    <p className="text-[#006666] font-semibold">
                                      {c.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {c.lecturer}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            );
                          })}

                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>
              );
            })}

          </div>

        </main>

      </div>
    </div>
  );
};

export default FsmsTimetable;