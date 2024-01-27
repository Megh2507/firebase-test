import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const Auth = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
   
    const signIn = async () => {
        try {
          await createUserWithEmailAndPassword(auth, email, password);
          navigate("/home");

        } catch (err) {
            alert(err)
          console.error(err);
        }
      };
    
      const signInWithGoogle = async () => {
        try {
          await signInWithPopup(auth, googleProvider);
          navigate("/home");
        } catch (err) {
          console.error(err);
        }
      };
    
      const logout = async () => {
        try {
          await signOut(auth);
        
        } catch (err) {

          console.error(err);
        }
      };

      console.log("logging auth", auth)
    return (
      <div className="auth-sec">
        <input
          placeholder="Email..."
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password..."
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signIn}> Sign In</button>
  
        {/* <button onClick={signInWithGoogle}> Sign In With Google</button> */}
  
        <button onClick={logout}> Logout </button>
        <p>{auth?.currentUser?.email}</p>
      </div>
    );
  };