import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyC8xULVoXt0p4ZFXy0BkBGNVwLCseS4Jx0",
    authDomain: "fir-auth-2-6f5dc.firebaseapp.com",
    projectId: "fir-auth-2-6f5dc",
    storageBucket: "fir-auth-2-6f5dc.firebasestorage.app",
    messagingSenderId: "222552626230",
    appId: "1:222552626230:web:e85d801dc3b0ddb5533497"
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
    
            if (!response.ok) {
                console.error("Error en login:", data.error.message);
                alert(data.error.message); // Muestra el error en pantalla
                return;
            }
    
            if(data.success){
                window.location.href = "/dashboard" // nos lleva a una ventana on la referencia que le damos de la url
            }else{
                console.error("Error en login:", data.message);
            }
        
        } catch(error){
            console.error("Error al Logar Sesión", error);
        }
    }

document.getElementById("loginForm").addEventListener("submit", login)