import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCI9g6baPTh3-WbSLhg3zPvkEC1s7F5Uno',
  authDomain: 'admin-dashboard-74346.firebaseapp.com',
  databaseURL: 'https://admin-dashboard-74346-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'admin-dashboard-74346',
  storageBucket: 'admin-dashboard-74346.appspot.com',
  messagingSenderId: '140561293917',
  appId: '1:140561293917:web:6e19198ad14271f656a3b4',
  measurementId: 'G-RR2K2QLJWZ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const fs = getFirestore();

export { analytics, auth, fs };
