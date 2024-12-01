import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "./firebase";
import { doc, getDoc, setDoc, collection } from "firebase/firestore";

const auth = getAuth();

export const signUp = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Create a user document if it doesn't exist
  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    await setDoc(userRef, { email, stepCompleted: 1 });
  }

  console.log("Collection:", collection(db, "users"));
  return user;
};

export const signIn = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const getUserData = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  return userSnap.data();
};

export const signOut = async () => {
  await auth.signOut();
};

export const getPageConfig = async () => {
  const configRef = doc(db, "configs", "pageConfig");
  const configSnap = await getDoc(configRef);

  if (configSnap.exists()) {
    return configSnap.data();
  } else {
    throw new Error("Page components configuration not found");
  }
}