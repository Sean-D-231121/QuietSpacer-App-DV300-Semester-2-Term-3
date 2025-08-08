import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import {auth, db} from "../firebase"
import { doc, serverTimestamp, setDoc } from "firebase/firestore";

export const login = (email:string, password: string) =>{
signInWithEmailAndPassword(auth, email, password )
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    console.log("Logged in user: ", user.email)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

export const SignUp = async (username: string, email: string, password: string, checkPassword: string) =>{
 
    if (!username || !email || !password || !checkPassword) {
      alert("Please fill in all fields");
      return;
    }

    if (password !== checkPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      // Create Firebase user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user document in Firestore
      await setDoc(doc(db, "users", user.uid), {
        user_id: user.uid, 
        username: username,
        email: email,
        profile_pic: "", 
        bio: "", 
        createdAt: serverTimestamp(),
      });

     
      
    } catch (error: any) {
      console.error("Signup error:", error);
      
    }
  };

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Sign out error:", error);
  }
}
