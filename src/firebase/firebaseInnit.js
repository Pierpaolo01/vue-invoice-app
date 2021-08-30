import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAk4zBVaia-NwWWgqYSNdyTqJtDyPNzPxk",
  authDomain: "vue-invoice-app-98aba.firebaseapp.com",
  projectId: "vue-invoice-app-98aba",
  storageBucket: "vue-invoice-app-98aba.appspot.com",
  messagingSenderId: "946881034654",
  appId: "1:946881034654:web:148ec1457eebf2e376be8f",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp.firestore();