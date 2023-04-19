import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCDdjvPH0HQijHrd4x5YGEM6AlxXiZoTiU",
    authDomain: "school-f2be8.firebaseapp.com",
    projectId: "school-f2be8",
    storageBucket: "school-f2be8.appspot.com",
    messagingSenderId: "742837559846",
    appId: "1:742837559846:web:b0e97d1c09c20955ee3ce7"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db