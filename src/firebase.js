

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyA-I2EatZMWnBDasvqRd9svEhUO3Rs4lOY",
  authDomain: "blogplatform-8f233.firebaseapp.com",
  projectId: "blogplatform-8f233",
  storageBucket: "blogplatform-8f233.appspot.com",
  messagingSenderId: "339511224098",
  appId: "1:339511224098:web:b95e7ac432cfe5ae6ca77b",
  measurementId: "G-WQRKLWZTPK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage =getStorage()