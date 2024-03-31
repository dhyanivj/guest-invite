import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB_TyPJdSSxh7Br4pB0RSNlcIClMDmC_xc",
  authDomain: "einvite-7634d.firebaseapp.com",
  projectId: "einvite-7634d",
  storageBucket: "einvite-7634d.appspot.com",
  messagingSenderId: "943214732528",
  appId: "1:943214732528:web:4d19f805c156c13f6b4e35",
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();

const db = firebase.firestore();

export { db, storage };