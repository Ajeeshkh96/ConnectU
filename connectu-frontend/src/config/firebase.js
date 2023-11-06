import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQ0Eye1_xA6Qo6kmcygblIH2Poy8SS5XU",
  authDomain: "connectu-5ee39.firebaseapp.com",
  projectId: "connectu-5ee39",
  storageBucket: "connectu-5ee39.appspot.com",
  messagingSenderId: "250262455448",
  appId: "1:250262455448:web:44d535962d9bcb277cfced",
  measurementId: "G-KK7S8XG1V4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;