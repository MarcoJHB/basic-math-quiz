import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBDXXWm8ixY_XqelEey244x2aRvKoBeo90',
  authDomain: 'test-yo-math.firebaseapp.com',
  projectId: 'test-yo-math',
  storageBucket: 'test-yo-math.appspot.com',
  messagingSenderId: '311114587729',
  appId: '1:311114587729:web:5c93213dbf3423d8e2a270',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export const firestore = getFirestore(app);
const db = getFirestore(app);

export { db };
