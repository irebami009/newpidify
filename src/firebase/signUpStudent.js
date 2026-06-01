// src/firebase/signUpStudent.js
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, setDoc } from "firebase/firestore";

export const signUpStudent = async (fullname, email, password, faculty) => {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save additional info in Firestore
    await setDoc(doc(db, "users", user.uid), {
      fullname,
      email,
      faculty,
      role: "student",
      createdAt: new Date(),
    });

    alert("Registration successful!");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};