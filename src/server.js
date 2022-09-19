import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, onValue, onChildAdded, get } from "firebase/database";
import {getAuth} from "firebase/auth";
import { store } from "./app/store";
import {db} from "./index"
import { setUserConfig, setUserData } from "./features/actions";
export {writeNewUser};

function writeNewUser({displayName, photoURL, uid}) {
 set(ref(db, "users/" + uid), {
   displayName,
   photoURL
 });

store.dispatch(setUserConfig({displayName, photoURL}))

set(ref(db, "habits/" + uid), {active: ["null"]})
set(ref(db, "category/" + uid), {active: ["null"]})

}

function setUserDatas({uid}) {
  const categoryRef = ref(db, `category/${uid}/active`);
  get(categoryRef).then((snap) => {
    if (snap.exists()) {
      const data = snap.val();
      store.dispatch(setUserData(data));
    }
  })
}

export {setUserDatas};


