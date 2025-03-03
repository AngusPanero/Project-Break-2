const express = require("express");
const Product = require("../models/Product");
const admin = require("firebase-admin");
const auth = admin.auth();
const path = require("path");
const productController = require("../controllers/productController");
const checkAuth = require("../middlewares/authMiddleware");
const routerProduct = express.Router();
require("dotenv").config()

routerProduct.get("/", checkAuth, productController.index)

routerProduct.post("/create", checkAuth, productController.create)

routerProduct.get("/create", checkAuth, productController.htmlCreateView)

routerProduct.get("/individual", productController.individual)

routerProduct.get("/id", productController.findAll)

routerProduct.get("/id-html", checkAuth, productController.updateView)

routerProduct.get("/id/:_id", productController.findBy)

routerProduct.put("/update/:_id", checkAuth, productController.update)

routerProduct.delete("/delete/:_id", checkAuth, productController.deleteProduct)

module.exports = routerProduct 