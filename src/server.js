import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, onValue, onChildAdded, get } from "firebase/database";
import {getAuth} from "firebase/auth";
import { store } from "./app/store";
import {db} from "./index"
import { setActiveCategory, setUserConfig, setUserData } from "./features/actions";

function writeNewUser({displayName, photoURL, uid}) {
  const userRef = ref(db, "users/" + uid);
  get(userRef).then((snap) => {
    if (snap.exists()) {
      setUserDatas(uid);
    } else {
      set(ref(db, "users/" + uid), {
        displayName,
        photoURL,
      });

      store.dispatch(setUserConfig({ displayName, photoURL }));
      set(ref(db, "category/" + uid), { active: ["null"] });

    }
  })
 

}

function setUserDatas({uid}) {
  const categoryRef = ref(db, `category/${uid}/active`);
  get(categoryRef).then((snap) => {
    if (snap.exists()) {
      const data = snap.val();
      store.dispatch(setUserData(data));
      if (data.length > 1) {
        store.dispatch(setActiveCategory(data[1]));
      }

    }
  })
}

export {setUserDatas};
export { writeNewUser };


