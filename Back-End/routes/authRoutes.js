const express = require("express");
const Product = require("../models/Product");
const admin = require("firebase-admin");
const auth = admin.auth();
const path = require("path");
const router = express.Router();
require("dotenv").config()

router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../../Front-End", "register.html"))
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
    res.sendFile(path.join(__dirname, "../../Front-End", "login.html"))
})

router.post("/login", async (req, res) => {
    console.log("DATOS RECIBIDOS LOGIN - REQ", req.body);
    
    const { idToken } = req.body;

    if (!idToken) {
        return res.status(400).json({ success: false, message: 'Token no proporcionado' });
    }

    try{
        await auth.verifyIdToken(idToken)
        res.cookie("token", idToken, { httpOnly: true, secure: false }); //secure en false pq estamos en desarrollo en produ(https true) y httpOnly true para que nadie pueda acceder a nuestra cookie, solo quien este en nuestro navegador
        res.json({ success: true })
    }catch(error) {
        res.status(401).json({ success: false, message: "Token inválido" });
    }
})

router.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "../../Front-End", "dashboard.html"))
})

router.post('/logout', (req, res) => {
    res.clearCookie('token')
    res.redirect('/login')
})

module.exports = router;