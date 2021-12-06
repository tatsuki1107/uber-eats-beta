import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDmd09dLdRYv6M7V_fu0hAF9r5qa4iHRzM",
  authDomain: "business-idea-4145d.firebaseapp.com",
  projectId: "business-idea-4145d",
  storageBucket: "business-idea-4145d.appspot.com",
  messagingSenderId: "864201535739",
  appId: "1:864201535739:web:8e89eb6b2ee191be88805e",
  measurementId: "G-BF3YMXWML2"
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore();
export const auth = firebase.auth();

export default firebase
