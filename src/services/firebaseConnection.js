// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD25MIdQpSPtCfompcWVP8nqqgx5e3nNNg",
  authDomain: "fir-chamados2.firebaseapp.com",
  projectId: "fir-chamados2",
  storageBucket: "fir-chamados2.appspot.com",
  messagingSenderId: "198690587163",
  appId: "1:198690587163:web:d7aae29693b19b08466ebe"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 

