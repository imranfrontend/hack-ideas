import * as firebase from "firebase/app";
import 'firebase/database';

// Your web app's Firebase configuration

const firebaseConfig = {
    apiKey: "AIzaSyAKQZLKHGhRr6Fs_q_VoyP4imbMoTZ2hvo",
    authDomain: "hack-ideas-f8e00.firebaseapp.com",
    databaseURL: "https://hack-ideas-f8e00-default-rtdb.firebaseio.com/",
    projectId: "hack-ideas-f8e00",
    storageBucket: "hack-ideas-f8e00.appspot.com",
    messagingSenderId: "449713674134",
    appId: "1:449713674134:web:97b3d68d826f2e6492afb7"
};
  
  
// Initialize Firebase
var fireDb = firebase.initializeApp(firebaseConfig);

export default fireDb.database().ref();
