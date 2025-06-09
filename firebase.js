// Importiere die benötigten Firebase-Dienste
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-storage.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.0/firebase-auth.js";

// Deine Firebase-Konfiguration
const firebaseConfig = {
    apiKey: "AIzaSyCs5IVnEwEQBxKtayI1XbzAh2e7zNeSxvg",
    authDomain: "wastespectre.firebaseapp.com",
    projectId: "wastespectre",
    storageBucket: "wastespectre.firebaseapp.com",
    messagingSenderId: "426840132509",
    appId: "1:426840132509:web:0186d08af8b57ce34e7d74",
    measurementId: "G-890C4DRXG6"
};

// Firebase initialisieren
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Exporte für die Nutzung in anderen Dateien
export { db, storage, auth };
