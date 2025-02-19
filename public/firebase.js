import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAqfx67W2zD7grSXqmZ0XPykGaRvbX2kyw",
    authDomain: "fir-auth-acc2f.firebaseapp.com",
    projectId: "fir-auth-acc2f",
    storageBucket: "fir-auth-acc2f.firebasestorage.app",
    messagingSenderId: "601019142299",
    appId: "1:601019142299:web:bb5e70fa96db2a86ccf63e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const login = async (evento) => {
    evento.preventDefault();
    try{
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        const idToken = await user.getIdToken()
        console.log("TOKEEEEEEEEEEEEN", idToken);

        if (!idToken) {
            console.error("El idToken está vacío o no se ha generado correctamente.");
            return;
        }

        const response = await fetch("/login", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ idToken }) // Asegurar que se envíe como JSON
        });

        const data = await response.json()

        if(data.success){
            window.location.href = "/dashbord" // nos lleva a una ventana on la referencia que le damos de la url
        }else{
            console.error("Error en login:", data.message);
        }
    
    } catch(error){
        console.error("Error al Logar Sesión", error);
    }
}

document.getElementById("loginForm").addEventListener("submit", login)