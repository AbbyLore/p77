import firebase from 'firebase';
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyDOO2D91auNezMJyF-Qtp23XC8QH7Go0dA",
    authDomain: "barterboi-71f64.firebaseapp.com",
    databaseURL: "https://barterboi-71f64.firebaseio.com",
    projectId: "barterboi-71f64",
    storageBucket: "barterboi-71f64.appspot.com",
    messagingSenderId: "1071797111394",
    appId: "1:1071797111394:web:c851120f7caacbe0f45f3b"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();