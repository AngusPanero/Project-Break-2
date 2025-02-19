const express = require("express")
const path = require("path")
const admin = require("firebase-admin")
const userService = require("./services/userService")
const cookieParser = require("cookie-parser")
require("dotenv").config()

admin.initializeApp({
    credential: admin.credential.cert(userService)
})

const router = require("./routes/authRoutes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser()) // se usa para que todas las rutas pasen por aca y sirve para verificar el usuario por todas las rutas;

app.use(express.static(path.join(__dirname, "config")));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", router);

const PORT = 2456;

app.listen(PORT, () => {
    console.log(`Server Listening on http://localhost:${PORT}`);
});