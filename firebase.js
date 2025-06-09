// Firebase-Konfiguration
const firebaseConfig = {
    apiKey: "DEINE_API_KEY",
    authDomain: "DEINE_AUTH_DOMAIN",
    projectId: "DEIN_PROJECT_ID",
    storageBucket: "DEIN_STORAGE_BUCKET",
    messagingSenderId: "DEINE_SENDER_ID",
    appId: "DEINE_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Registrierung & Login
document.getElementById("register").addEventListener("click", function() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let nickname = document.getElementById("nickname").value;

    if (password.length < 8) {
        alert("Passwort muss mindestens 8 Zeichen haben!");
        return;
    }

    auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
        let user = userCredential.user;
        db.collection("users").doc(user.uid).set({
            email: email,
            nickname: nickname
        });
        alert("Registrierung erfolgreich!");
    }).catch((error) => {
        alert(error.message);
    });
});

document.getElementById("login").addEventListener("click", function() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password).then(() => {
        alert("Login erfolgreich!");
    }).catch((error) => {
        alert(error.message);
    });
});
