// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCTb1gBN43xdi-QiByPtAvht1gnPSYyhZk',
  authDomain: 'tua-ecom.firebaseapp.com',
  projectId: 'tua-ecom',
  storageBucket: 'tua-ecom.appspot.com',
  messagingSenderId: '523319925393',
  appId: '1:523319925393:web:b8a421fdbd51443fe17d30',
  measurementId: 'G-P3BKY11F1L',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const storage = getStorage(app);

export default app
