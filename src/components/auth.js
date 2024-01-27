import { auth, googleProvider } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { HiMiniUserCircle } from "react-icons/hi2";

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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password..."
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={signIn}> Sign In</button>
  
        {/* <button onClick={signInWithGoogle}> Sign In With Google</button> */}
  
        <button onClick={logout}> Logout </button>
        <div style={{
          backgroundImage: "linear-gradient(to top, #e14fad 0%, #f9d423 100%)",
          padding:"10px 20px",
          borderRadius:"20px",
          color:"white",
          display:"flex",
          alignItems:"center",
          gap:"10px"
        }}><HiMiniUserCircle /> <p>{auth?.currentUser?.email}</p></div>
       
      </div>
    );
  };