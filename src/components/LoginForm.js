import { useContext, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { writeNewUser, auth } from "../server";
import { context } from "..";

export {LoginForm}

function LoginForm() {
    const { auth } = useContext(context)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleSignUp() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider).then((res)=>writeNewUser(res.user))
        // createUserWithEmailAndPassword(auth, email, password).then((user)=>console.log(user.user.uid));
        // writeNewUser({userId: "user2", name: "vika"})
    }

    return (
      <div className="modal-window-wrapper">
        <div className="modal-window">
          <div className="modal-content">
            <h2 className="hello-title">Welcome to your success diary!</h2>
            <form>
              <label class="modal">
                Enter your email
                <br />
                <input
                  type="text"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="mymail@gmail.com"
                />
              </label>
              <br />
              <label class="modal">
                Enter your password
                <br />
                <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password..."
                />
              </label>
              <br />
              <input type="button" value="Sign in" />
              <input type="button" onClick={handleSignUp}value="Sign up" />
            </form>
          </div>
        </div>
      </div>
    );
}