import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, onValue } from "firebase/database";
import {getAuth} from "firebase/auth";
import { store } from "./app/store";
import {db} from "./index"
import { setUserConfig } from "./features/actions";
export {writeNewUser};

function writeNewUser({displayName, photoURL, uid}) {
 set(ref(db, "users/" + uid), {
   displayName,
   photoURL
 });

 store.dispatch(setUserConfig({displayName, photoURL}))

//  const starCountRef = ref(db);
//  onValue(starCountRef, (snapshot) => {
//    const data = snapshot.val();
//    console.log(data);
//  });

}
