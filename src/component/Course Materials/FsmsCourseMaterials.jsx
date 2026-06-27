import React, { useState, useEffect, useRef } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url";
GlobalWorkerOptions.workerSrc = pdfWorker;

import { Link, useParams } from "react-router-dom";
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
  orderBy,
} from "firebase/firestore";

import { db, auth, storage } from "../../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Bell, User } from "lucide-react";

const LEVELS = [100, 200, 300, 400];
const allowedLevels = new Set(LEVELS.map(String));

const FsmsCourseMaterials = ({
  courseDisplayName,
  courseSlug,
  routePathBase,
  materialType,
}) => {
  const { level } = useParams();
  const normalizedLevel = allowedLevels.has(level) ? level : "100";
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");

  const [studentName, setStudentName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) return;
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (!userDoc.exists()) return;
      const data = userDoc.data();
      if ((data.faculty || "").toLowerCase() !== "fsms") {
        window.location.href = "/login";
        return;
      }
      setStudentName(data.fullname || "Student");
      setProfilePicture(data["profile-picture"] || "");
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "notifications", "fsms", "items"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNotifications(data);
      setUnreadCount(data.filter((n) => !n.read).length);
    });

    return () => unsubscribe();
  }, []);

  const markAllAsRead = async () => {
    await Promise.all(
      notifications.map((note) => {
        if (!note.read) {
          return updateDoc(doc(db, "notifications", "fsms", "items", note.id), {
            read: true,
          });
        }
      })
    );
    setUnreadCount(0);
  };

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

  useEffect(() => {
    const fetchType = `${materialType === "pdf" ? "pdf" : "pq"}_${courseSlug}`;
    const fetchFiles = async () => {
      try {
        const res = await fetch(`http://localhost/pidify/pidify/getFiles.php?level=${normalizedLevel}&type=${fetchType}`);
        const data = await res.json();
        setFiles(data || []);
      } catch (err) {
        console.error(err);
        setFiles([]);
      }
    };

    fetchFiles();

    const interval = setInterval(fetchFiles, 2000);

    return () => clearInterval(interval);
  }, [normalizedLevel, courseSlug, materialType]);

  const getAllUsers = async () => {
    const snap = await getDocs(collection(db, "users"));
    return snap.docs.map((doc) => doc.id);
  };

  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);
    try {
      const uploadedFiles = [];
      const fetchType = `${materialType === "pdf" ? "pdf" : "pq"}_${courseSlug}`;

      for (const file of selectedFiles) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("level", normalizedLevel);
        formData.append("type", fetchType);

        const res = await fetch("http://localhost/pidify/pidify/upload.php", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();

        let pages = "";
        if (file.type === "application/pdf") {
          const arrayBuffer = await file.arrayBuffer();
          const pdf = await getDocument({ data: arrayBuffer }).promise;
          pages = pdf.numPages;
        }

        uploadedFiles.push({
          id: data.id || Date.now(),
          name: file.name,
          type: file.type,
          url: data.url,
          pages,
          preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : null,
        });
      }

      const messageType =
        materialType === "pdf"
          ? `${selectedFiles.length} new ${courseDisplayName.toLowerCase()} materials added 📚`
          : `${selectedFiles.length} new ${courseDisplayName.toLowerCase()} past questions added 📚`;

      await addDoc(collection(db, "notifications", "fsms", "items"), {
        message: messageType,
        read: false,
        createdAt: serverTimestamp(),
      });

      const users = await getAllUsers();
      await Promise.all(
        users.map((userId) =>
          addDoc(collection(db, "users", userId, "fsms_notifications"), {
            message: messageType,
            read: false,
            createdAt: serverTimestamp(),
          })
        )
      );

      setFiles((prev) => [...prev, ...uploadedFiles]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (file) => {
    await fetch(`http://localhost/pidify/pidify/deleteFile.php?id=${file.id}&fileName=${file.name}`, { method: "GET" });
    setFiles((prev) => {
      if (file.preview) URL.revokeObjectURL(file.preview);
      return prev.filter((f) => f.id !== file.id);
    });
  };

  const truncate = (str, n = 24) => (str.length > n ? str.slice(0, n) + "..." : str);
  const filteredFiles = files.filter((file) => file.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="flex bg-gray-100 w-full overflow-x-hidden">
      <div className="flex-1 flex flex-col w-full min-w-0">
        <header className="flex flex-col md:flex-row md:items-center md:justify-between bg-white shadow-md px-4 md:px-8 py-4 w-full relative">
          <div className="w-full md:w-auto">
            <h1 className="text-lg md:text-xl font-semibold text-gray-700">
              Faculty of Social and Management Sciences (FSMS) Dashboard
            </h1>
          </div>
          <div className="flex items-center justify-between md:justify-end mt-3 md:mt-0 gap-4 md:gap-6 w-full md:w-auto">
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
                  <h3 className="font-semibold mb-2 text-gray-700">Notifications</h3>
                  {notifications.length === 0 ? (
                    <p className="text-sm text-gray-500">No notifications yet</p>
                  ) : (
                    <div className="space-y-2 max-h-60 overflow-y-auto">
                      {notifications.map((note) => (
                        <div key={note.id} className="text-sm p-2 bg-gray-100 rounded-md">
                          {note.message}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <span className="text-gray-700 font-medium text-sm md:text-base">Hi, {studentName} 👋</span>
              <div
                className="w-9 h-9 bg-gray-200 rounded-full flex items-center justify-center cursor-pointer overflow-hidden"
                onClick={handleIconClick}
              >
                {profilePicture ? (
                  <img src={profilePicture} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-5 h-5 text-gray-600" />
                )}
              </div>
              <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleProfileChange} />
            </div>
          </div>
        </header>

        <section className="p-6 md:p-8 bg-gray-50 min-h-screen overflow-y-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-2xl font-semibold text-gray-800 mb-4">
              Access {normalizedLevel} Level {courseDisplayName} {materialType === "pdf" ? "Course Materials" : "Past Questions"}
            </h1>
            <input
              type="text"
              placeholder="Search for course materials..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-xl shadow-sm"
            />
          </div>
          <nav className="flex flex-wrap gap-3 mb-6">
            {LEVELS.map((levelNumber) => (
              <Link
                key={levelNumber}
                to={`${routePathBase}/${levelNumber}`}
                className={`px-4 py-2 rounded-lg border ${
                  normalizedLevel === String(levelNumber)
                    ? "bg-[#006666] text-white"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {levelNumber} LVL
              </Link>
            ))}
          </nav>
          <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <label className="cursor-pointer bg-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center border-dashed border-2 border-gray-300 hover:border-gray-400 transition">
              <div className="text-4xl text-gray-400 mb-2">➕</div>
              <p className="text-gray-500">Add File</p>
              <input type="file" multiple onChange={handleFileChange} className="hidden" />
            </label>
            {filteredFiles.map((file) => (
              <div key={file.id || file.name} className="bg-white rounded-2xl shadow-md p-4 text-center relative">
                <button onClick={() => handleDelete(file)} className="absolute top-2 right-2 text-red-500 font-bold">✖</button>
                <a href={file.url} target="_blank" rel="noopener noreferrer">
                  <img src={file.preview || "/Images/pdf-icon.png"} className="w-24 h-24 mx-auto mb-3" alt="file preview" />
                  <h2 className="text-lg font-semibold">{truncate(file.name)}</h2>
                  {file.pages && <p className="text-gray-500 text-sm">{file.pages} Pages</p>}
                </a>
              </div>
            ))}
          </main>
        </section>
      </div>
    </div>
  );
};

export default FsmsCourseMaterials;


