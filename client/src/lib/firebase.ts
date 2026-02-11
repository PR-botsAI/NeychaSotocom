import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyA7kpRlGNNlh8AVi9-qPK58UvEMBGo059w",
  authDomain: "neychasoto-com.firebaseapp.com",
  projectId: "neychasoto-com",
  storageBucket: "neychasoto-com.firebasestorage.app",
  messagingSenderId: "127053846583",
  appId: "1:127053846583:web:507bc69b6abfdcedef07b2",
  measurementId: "G-H1HEKME7DW"
};

const app = initializeApp(firebaseConfig);

// Initialize analytics safely (handles ad-blockers, SSR, privacy browsers)
isSupported().then((supported) => {
  if (supported) {
    getAnalytics(app);
  }
});

export default app;
