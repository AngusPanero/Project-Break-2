const express = require("express");
const Product = require("../models/Product");
const admin = require("firebase-admin");
const auth = admin.auth();
const path = require("path");
const { log } = require("console");
const routerProduct = express.Router();
require("dotenv").config()

routerProduct.post("/create", async (req, res) => {
    try {
        console.log(req.body);
        const product = await Product.create({
            titulo: req.body.titulo,
            categoria: req.body.categoria,
            precio: req.body.precio
        })

    } catch (error) {
        console.error("ERROR", error);
        res.status(500).send({ Message: "500 - Error en la Solicitud" });
    }
})

routerProduct.get("/create", async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "../../Front-End", "createProduct.html"))

    } catch (error) {
        console.error("ERROR", error);
        res.status(404).send({ Message: "500 - Página no Encontrada" });
    }
})

module.exports = routerProduct