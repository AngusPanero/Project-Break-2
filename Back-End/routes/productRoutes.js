const express = require("express");
const Product = require("../models/Product");
const admin = require("firebase-admin");
const auth = admin.auth();
const path = require("path");
const checkAuth = require("../middlewares/authMiddleware");
const { log } = require("console");
const routerProduct = express.Router();
require("dotenv").config()

routerProduct.post("/create", checkAuth, async (req, res) => {
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

routerProduct.get("/create", checkAuth, async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "../../Front-End", "createProduct.html"))

    } catch (error) {
        console.error("ERROR", error);
        res.status(404).send({ message: "500 - Página no Encontrada" });
    }
})

routerProduct.get("/id", checkAuth, async (req, res) => {
    try {
        const productos = await Product.find(); // Busca todos los productos en la DB
        res.status(200).json(productos);

    } catch (error) {
        console.error(error);
        res.status(500).send({ Message: "500 - Error en la Solicitud" });
    }
})

routerProduct.get("/id-html", checkAuth, async (req, res) => {
    try {
        res.sendFile(path.join(__dirname, "../../Front-End", "updateProduct.html"))

    } catch (error) {
        console.error(error);
        res.status(500).send({ Message: "500 - Error en la Solicitud" });
    }
})

routerProduct.get("/id/:_id", checkAuth, async (req, res) => { // Get a Post??
    try {
        const id = await Product.findById(req.params._id)
        res.status(200).send(id);

        if(!id){
            console.error("ERROR", error);
        res.status(404).send({ Mensaje: "404 - ID no Encontrado" })
        }

    } catch(error) {
        console.error("ERROR", error);
        res.status(500).send({ Mensaje: "500 - Error Interno" })
    }
})

routerProduct.put("/update/:_id", checkAuth, async (req, res) => { 
    try {
        console.log("REQ BODY PUT", req.body);

        const product = await Product.findByIdAndUpdate(req.params._id, {
            titulo: req.body.titulo,
            categoria: req.body.categoria,
            precio: req.body.precio
        }, { new: true })
        res.redirect("/id-html")
    } catch(error) {
        console.error("ERROR", error);
        res.status(500).send({ Mensaje: "500 - Error Interno" })
    }
})

routerProduct.delete("/delete/:_id", checkAuth, async (req, res) => { 
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params._id)
        
        if(!deleteProduct){
            console.error("ERROR", error);
        res.status(404).send({ Mensaje: "404 - ID no Encontrado" })
        }
        res.redirect("/id-html")
    } catch(error) {
        console.error("ERROR", error);
        res.status(500).send({ Mensaje: "500 - Error Interno" })
    }
})

module.exports = routerProduct