import React, { useState, useEffect, useRef } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url";
GlobalWorkerOptions.workerSrc = pdfWorker;

import { Link } from "react-router-dom";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  onSnapshot,
  query,
  orderBy
} from "firebase/firestore";

import { db, auth, storage } from "../../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Bell, User } from "lucide-react";

const LevelCompPdf1 = () => {

  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");
  const [studentName, setStudentName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const fileInputRef = useRef(null);

  // ================= AUTH =================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();

        if ((data.faculty || "").toLowerCase() !== "fpas") {
          window.location.href = "/login";
        }

        setStudentName(data.fullname || "Student");
        setProfilePicture(data["profile-picture"] || "");
      }
    });

    return () => unsubscribe();
  }, []);

  // ================= PHP SYNC (UNCHANGED) =================
  const fetchFiles = async () => {
    try {
      const res = await fetch(
        "http://localhost/pidify/pidify/getFiles.php?level=100&type=pdf_comp"
      );
      const data = await res.json();
      setFiles(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFiles();

    const interval = setInterval(() => {
      fetchFiles();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // ================= 🔔 FIXED NOTIFICATIONS (ONLY CHANGE) =================
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

      // FIX: handle missing "read" field safely
      const unread = data.filter((n) => n.read !== true).length;
      setUnreadCount(unread);
    });

    return () => unsubscribe();
  }, []);

  // ================= MARK AS READ =================
  const markAllAsRead = async () => {
    const snap = await getDocs(collection(db, "notifications", "fpas", "items"));

    snap.forEach(async (d) => {
      if (!d.data().read) {
        await updateDoc(doc(db, "notifications", "fpas", "items", d.id), {
          read: true,
        });
      }
    });

    setUnreadCount(0);
  };

  // ================= PROFILE =================
  const handleProfileChange = async (e) => {
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

  // ================= FILE UPLOAD (UNCHANGED) =================
  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);

    try {
      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("level", "100");
        formData.append("type", "pdf_comp");

        await fetch("http://localhost/pidify/pidify/upload.php", {
          method: "POST",
          body: formData,
        });
      }

      fetchFiles();

      await addDoc(collection(db, "notifications", "fpas", "items"), {
        message: `${selectedFiles.length} new computer science materials added 📚`,
        read: false, // IMPORTANT
        createdAt: serverTimestamp(),
      });

    } catch (error) {
      console.log(error);
    }
  };

  // ================= DELETE (UNCHANGED) =================
  const handleDelete = async (file) => {
    await fetch(
      `http://localhost/pidify/pidify/deleteFile.php?id=${file.id}&fileName=${file.name}`
    );

    fetchFiles();
  };

  const truncate = (str, n = 20) =>
    str.length > n ? str.slice(0, n) + "..." : str;

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(search.toLowerCase())
  );

  // ================= UI (UNCHANGED COMPLETELY) =================
  return (
    <div className="flex bg-gray-100 w-full overflow-x-hidden">
      <div className="flex-1 flex flex-col w-full min-w-0">

        <header className="flex flex-col md:flex-row md:items-center md:justify-between bg-white shadow-md px-4 md:px-8 py-4 w-full relative">

          <div className="w-full md:w-auto">
            <h1 className="text-lg md:text-xl font-semibold text-gray-700">
              Faculty of Pure and Applied Sciences (FPAS) Dashboard
            </h1>
          </div>

          <div className="flex items-center justify-between md:justify-end mt-3 md:mt-0 gap-4 md:gap-6 w-full md:w-auto">

            {/* NOTIFICATION ICON */}
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
                <div className="absolute right-0 mt-3 w-72 bg-white shadow-lg rounded-lg p-3 z-50">

                  <h3 className="font-semibold mb-2 text-gray-700">
                    Notifications
                  </h3>

                  {notifications.length === 0 ? (
                    <p className="text-sm text-gray-500">No notifications</p>
                  ) : (
                    notifications.map((note) => (
                      <div
                        key={note.id}
                        className="text-sm p-2 bg-gray-100 rounded-md"
                      >
                        {note.message}
                      </div>
                    ))
                  )}

                </div>
              )}
            </div>

            {/* USER */}
            <div className="flex items-center gap-2 md:gap-3">
              <span className="text-gray-700 font-medium">
                Hi, {studentName} 👋
              </span>

              <div
                className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer overflow-hidden"
                onClick={handleIconClick}
              >
                {profilePicture ? (
                  <img
                    src={profilePicture}
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
                onChange={handleProfileChange}
              />
            </div>

          </div>
        </header>

        {/* EVERYTHING BELOW IS EXACTLY YOUR DESIGN */}
        <section className="flex-1 p-6 md:p-8 bg-gray-50 min-h-screen overflow-y-auto">

          <div className="mb-8">
            <h1 className="text-1.5xl md:text-1.5xl font-semibold text-gray-800 mb-4">
              Access 100 Level Computer Science Course Materials
            </h1>

            <input
              type="text"
              placeholder="Search for materials..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-xl shadow-sm"
            />
          </div>

          <nav className="flex flex-wrap gap-3 mb-6">
            <Link to="/computer-science-pdf/100" className="px-4 py-2 bg-[#006666] text-white rounded-lg">100 LVL</Link>
            <Link to="/computer-science-pdf/200" className="px-4 py-2 bg-white border rounded-lg">200 LVL</Link>
            <Link to="/computer-science-pdf/300" className="px-4 py-2 bg-white border rounded-lg">300 LVL</Link>
            <Link to="/computer-science-pdf/400" className="px-4 py-2 bg-white border rounded-lg">400 LVL</Link>
          </nav>

          <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            <label className="cursor-pointer bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center border-dashed border-2">
              <div className="text-4xl text-gray-400 mb-2">➕</div>
              <p className="text-gray-500">Add File</p>
              <input type="file" multiple onChange={handleFileChange} className="hidden" />
            </label>

            {filteredFiles.map((file) => (
              <div key={file.id} className="bg-white rounded-2xl shadow-md p-4 text-center relative">

                <button
                  onClick={() => handleDelete(file)}
                  className="absolute top-2 right-2 text-red-500 font-bold"
                >
                  ✖
                </button>

                <a href={file.url} target="_blank" rel="noopener noreferrer">
                  <img src={file.preview || "/Images/pdf-icon.png"} className="w-24 h-24 mx-auto mb-3" />
                  <h2 className="text-lg font-semibold">
                    {truncate(file.name)}
                  </h2>
                </a>

              </div>
            ))}

          </main>
        </section>

      </div>
    </div>
  );
};

export default LevelCompPdf1;