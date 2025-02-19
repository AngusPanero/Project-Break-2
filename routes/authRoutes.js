const express = require("express");
const admin = require("firebase-admin");
const auth = admin.auth();
const path = require("path");
const router = express.Router();
require("dotenv").config()

router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "register.html"))
})

router.post("/register", async (req, res) => {
    const { email, password } = req.body;

    try{
        await auth.createUser({
            email,
            password
        })
    res.redirect("/login")

    } catch(error) {
        console.error("Error en el Registro", error);
        res.redirect("/register")
    }
})

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "login.html"))
})

router.post("/login", async (req, res) => {
    const { idToken } = req.body;

    if (!idToken) {
        return res.status(400).json({ error: 'Token no proporcionado' });
    }

    try{
        await auth.verifyIdToken(idToken)
        res.cookie("token", idToken, { httpOnly: true, secure: false }); //secure en false pq estamos en desarrollo en produ(https true) y httpOnly true para que nadie pueda acceder a nuestra cookie, solo quien este en nuestro navegador
        res.json({ success: true })
    }catch(error) {
        console.error("Error en el Inicio de Sesión", error, idToken);
        res.redirect("/login")
    }
})

router.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "../public", "dashboard.html"))
})

module.exports = router;