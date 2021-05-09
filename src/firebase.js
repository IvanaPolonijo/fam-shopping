import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDfz-JKzxwEZrl0i4DAmC8q_PkqBNkmOU8",
    authDomain: "famshopping-5a2df.firebaseapp.com",
    projectId: "famshopping-5a2df",
    storageBucket: "famshopping-5a2df.appspot.com",
    messagingSenderId: "347217003490",
    appId: "1:347217003490:web:ab1e317c867e5f74092fbb"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  let db = firebase.firestore();
  export { firebase, db };