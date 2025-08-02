import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../firebase"

export const login = (email:string, password: string) =>{
signInWithEmailAndPassword(auth, email, password)
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
