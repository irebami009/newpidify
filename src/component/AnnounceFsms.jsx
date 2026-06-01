import React, { useEffect, useState, useRef } from "react";
import { Bell, User, Trash2 } from "lucide-react";
import { auth, db, storage } from "../firebase/firebase";
import toast from "react-hot-toast";

import {
  doc,
  getDoc,
  updateDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AnnounceFsms = () => {

  // ================= STATE =================
  const [studentName, setStudentName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [role, setRole] = useState("");

  const isOfficial = role === "official";

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const [announcements, setAnnouncements] = useState([]);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const audioRef = useRef(new Audio("/notification.mp3"));

  const [seenIds, setSeenIds] = useState([]);

  // ================= AUTH =================
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) return;

      const snap = await getDoc(doc(db, "users", user.uid));

      if (snap.exists()) {
        const data = snap.data();
        setStudentName(data.fullname || "User");
        setProfilePicture(data["profile-picture"] || "");
        setRole(data.role || "student");
        setSeenIds(data.seenAnnouncements || []);
      }
    });

    return () => unsub();
  }, []);

  // ================= REALTIME =================
  useEffect(() => {
    const q = query(
      collection(db, "announcements_fsms"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setAnnouncements(data);

      const unseen = data.filter((a) => !seenIds.includes(a.id));
      setUnreadCount(unseen.length);

      if (unseen.length > 0) {
        const latest = unseen[0];
        toast.success(`${latest.sender} sent a message`);
        audioRef.current.play().catch(() => {});
      }
    });

    return () => unsub();
  }, [seenIds]);

  // ================= READ =================
  const markAsRead = async (id) => {
    const user = auth.currentUser;
    if (!user) return;

    const updated = [...seenIds, id];

    await updateDoc(doc(db, "users", user.uid), {
      seenAnnouncements: updated,
    });

    setSeenIds(updated);
  };

  const markAllAsRead = async () => {
    const user = auth.currentUser;
    if (!user) return;

    const allIds = announcements.map((a) => a.id);

    await updateDoc(doc(db, "users", user.uid), {
      seenAnnouncements: allIds,
    });

    setSeenIds(allIds);
  };

  // ================= POST =================
  const sendAnnouncement = async () => {
    if (!isOfficial) return;
    if (!message.trim() && !file) return;

    let fileUrl = "";

    if (file) {
      const storageRef = ref(
        storage,
        `fsms_announcements/${Date.now()}_${file.name}`
      );
      await uploadBytes(storageRef, file);
      fileUrl = await getDownloadURL(storageRef);
    }

    await addDoc(collection(db, "announcements_fsms"), {
      text: message,
      sender: studentName,
      senderId: auth.currentUser.uid,
      createdAt: serverTimestamp(),
      reactions: { like: [], love: [] },
      attachments: fileUrl ? [fileUrl] : [],
    });

    setMessage("");
    setFile(null);
  };

  // ================= DELETE =================
  const deletePost = async (id) => {
    if (!isOfficial) return;
    await deleteDoc(doc(db, "announcements_fsms", id));
    toast.success("Deleted");
  };

  // ================= REACT =================
  const react = async (post, type) => {
    const uid = auth.currentUser.uid;

    const refDoc = doc(db, "announcements_fsms", post.id);

    const already = post.reactions?.[type]?.includes(uid);

    await updateDoc(refDoc, {
      [`reactions.${type}`]: already
        ? arrayRemove(uid)
        : arrayUnion(uid),
    });
  };

  // ================= UI =================
  return (
    <div className="flex min-h-screen bg-gray-100 w-full overflow-x-hidden">
      <div className="flex-1 flex flex-col w-full min-w-0">

        {/* ================= NAVBAR (UNCHANGED EXACTLY) ================= */}
        <header className="flex flex-col md:flex-row md:items-center md:justify-between bg-white shadow-md px-4 md:px-8 py-4 w-full relative">

          <h1 className="text-lg md:text-xl font-semibold text-gray-700">
            FSMS Dashboard
          </h1>

          <div className="flex items-center gap-4">

            {/* ================= BELL ================= */}
            <div className="relative">

              <button
                onClick={() => {
                  const next = !showNotifications;
                  setShowNotifications(next);
                  if (next) markAllAsRead();
                }}
              >
                <Bell />

                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* ================= DROPDOWN (RESPONSIVE + SAME STYLE) ================= */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-72 max-w-[90vw] bg-white shadow-lg rounded-lg p-3 z-50 max-h-80 overflow-y-auto">

                  {announcements.length === 0 ? (
                    <p className="text-sm text-gray-500">No notifications</p>
                  ) : (
                    announcements.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markAsRead(n.id)}
                        className="text-sm p-2 border-b hover:bg-gray-100 cursor-pointer flex justify-between"
                      >
                        <span>
                          <strong>{n.sender}</strong> sent a message
                        </span>
                      </div>
                    ))
                  )}

                </div>
              )}

            </div>

            {/* ================= USER ================= */}
            <div className="flex items-center gap-3">

              <span className="text-gray-700 font-medium">
                Hi, {studentName} 👋
              </span>

              <div className="w-9 h-9 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {profilePicture ? (
                  <img src={profilePicture} className="w-full h-full object-cover" />
                ) : (
                  <User />
                )}
              </div>

            </div>

          </div>
        </header>

        {/* ================= WARNING (NO DESIGN CHANGE) ================= */}
        {!isOfficial && (
          <div className="text-center text-sm text-gray-600 py-2">
            ⚠️ Only student officials can post announcements
          </div>
        )}

        {/* ================= POST BOX ================= */}
        {isOfficial && (
          <div className="p-4 max-w-2xl mx-auto w-full">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full border p-2 rounded"
              placeholder="Write announcement..."
            />

            <button
              onClick={sendAnnouncement}
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
            >
              Post
            </button>
          </div>
        )}

        {/* ================= FEED ================= */}
        <div className="p-4 max-w-2xl mx-auto w-full space-y-4">

          {announcements.map((post) => (
            <div key={post.id} className="bg-white p-4 rounded-xl shadow">

              <div className="flex justify-between items-center">
                <strong>{post.sender}</strong>

                {isOfficial && (
                  <button
                    onClick={() => deletePost(post.id)}
                    className="text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>

              <p className="my-2">{post.text}</p>

              {post.attachments?.map((url, i) => (
                <img key={i} src={url} className="rounded max-h-60" />
              ))}

              <div className="flex gap-4 mt-3 text-sm">
                <button onClick={() => react(post, "like")}>
                  👍 {post.reactions?.like?.length || 0}
                </button>

                <button onClick={() => react(post, "love")}>
                  ❤️ {post.reactions?.love?.length || 0}
                </button>
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
};

export default AnnounceFsms;