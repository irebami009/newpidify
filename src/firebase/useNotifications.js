import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  updateDoc,
} from "firebase/firestore";
import toast from "react-hot-toast";

export const useNotifications = (userId) => {
  const [notifications, setNotifications] = useState([]);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    if (!userId) return;

    const q = query(
      collection(db, "users", userId, "notifications"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      setNotifications(data);
      setUnread(data.filter((n) => !n.read).length);

      // 🔥 REAL-TIME TOAST
      snap.docChanges().forEach((change) => {
        if (change.type === "added") {
          toast.success(change.doc.data().message);
        }
      });
    });

    return () => unsub();
  }, [userId]);

  const markAsRead = async (id) => {
    await updateDoc(doc(db, "users", userId, "notifications", id), {
      read: true,
    });
  };

  const markAllAsRead = async () => {
    notifications.forEach((n) => {
      if (!n.read) markAsRead(n.id);
    });
  };

  return { notifications, unread, markAsRead, markAllAsRead };
};