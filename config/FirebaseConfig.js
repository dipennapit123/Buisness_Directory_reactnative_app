// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCTLv56bGv5jg_tPXClnxQSi1eFd1Kn6zs",
  authDomain: "business-directory-3f4f4.firebaseapp.com",
  projectId: "business-directory-3f4f4",
  storageBucket: "business-directory-3f4f4.appspot.com",
  messagingSenderId: "967439441830",
  appId: "1:967439441830:web:d70959084172752510b967",
  measurementId: "G-C1Y1XKNYMB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
export const storage= getStorage(app)
// const analytics = getAnalytics(app);