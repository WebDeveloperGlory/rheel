// Import Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVWAwYbUph1bo9NllEIK-Yw7PlOmLanb0",
  authDomain: "rheelestate-b3b3f.firebaseapp.com",
  projectId: "rheelestate-b3b3f",
  storageBucket: "rheelestate-b3b3f.firebasestorage.app",
  messagingSenderId: "437240896648",
  appId: "1:437240896648:web:4e16d583cd76820202933d",
  measurementId: "G-9R94ZEFCKB"
}; 

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Initialize Analytics only on the client side
let analytics;
if (typeof window !== "undefined") {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch((error) => {
      console.error("Analytics not supported:", error);
    });
}

export { analytics };
