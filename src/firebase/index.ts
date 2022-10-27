import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCI9g6baPTh3-WbSLhg3zPvkEC1s7F5Uno',
  authDomain: 'admin-dashboard-74346.firebaseapp.com',
  databaseURL: 'https://admin-dashboard-74346-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'admin-dashboard-74346',
  storageBucket: 'admin-dashboard-74346.appspot.com',
  messagingSenderId: '140561293917',
  appId: '1:140561293917:web:503362d1c288f80656a3b4',
  measurementId: 'G-2V19QHMNN3',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
