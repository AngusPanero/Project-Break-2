const express = require("express");
const Product = require("../models/Product");
const admin = require("firebase-admin");
const auth = admin.auth();
const authController = require("../controllers/authController")
const checkAuth = require("../middlewares/authMiddleware");
const path = require("path");
const router = express.Router();
require("dotenv").config()

router.get("/register", authController.registerView)

router.post("/register", authController.register)

router.get("/login", authController.loginView)

router.post("/login", authController.login)

router.get("/dashboard", checkAuth, authController.dashboardView)

router.post('/logout', authController.logout)

module.exports = router;