const path = require("path");
const admin = require("firebase-admin");
const auth = admin.auth();
const checkAuth = require("../middlewares/authMiddleware");
require("dotenv").config()

const authController = {
    registerView: (req, res) => {
        res.sendFile(path.join(__dirname, "../../Front-End", "register.html"))
    },

    register: async (req, res) => {
        const { email, password } = req.body;
        console.log(req.body);
        
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
    },

    loginView: (req, res) => {
        res.sendFile(path.join(__dirname, "../../Front-End", "login.html"))
    },

    login: async (req, res) => {
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
    },

    dashboardView: (req, res) => {
        res.sendFile(path.join(__dirname, "../../Front-End", "dashboard.html"))
    },

    logout: (req, res) => {
        res.clearCookie('token')
        res.redirect('/login')
    }
}

module.exports = authController;