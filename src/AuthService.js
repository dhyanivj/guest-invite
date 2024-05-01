import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase";

// Function to sign in
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Signed in
    return userCredential.user;
  } catch (error) {
    // Handle Errors here.
    console.error(error);
    return null;
  }
};
