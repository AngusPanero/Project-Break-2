const Product = require("../models/Product")
const path = require("path");

const productController = {

    create: async (req, res) => {
        try {
            console.log(req.body);
            const product = await Product.create({
                titulo: req.body.titulo,
                categoria: req.body.categoria,
                url: req.body.url,
                precio: req.body.precio
            })
    
        } catch (error) {
            console.error("ERROR", error);
            res.status(500).send({ Message: "500 - Error en la Solicitud" });
            }
        },

        htmlCreateView: async (req, res) => {
            try {
                res.sendFile(path.join(__dirname, "../../Front-End", "createProduct.html"))
        
            } catch (error) {
                console.error("ERROR", error);
                res.status(404).send({ message: "500 - Página no Encontrada" });
            }
        },

        individual: async (req, res) => {
            try {
                res.sendFile(path.join(__dirname, "../../Front-End", "individual.html"))
        
            } catch (error) {
                console.error("ERROR", error);
                res.status(404).send({ message: "500 - Página no Encontrada" });
            }
        },

        findAll: async (req, res) => {
            try {
                const productos = await Product.find(); // Busca todos los productos en la DB
                res.status(200).json(productos);
        
            } catch (error) {
                console.error(error);
                res.status(500).send({ Message: "500 - Error en la Solicitud" });
            }
        },

        updateView: async (req, res) => {
            try {
                res.sendFile(path.join(__dirname, "../../Front-End", "updateProduct.html"))
        
            } catch (error) {
                console.error(error);
                res.status(500).send({ Message: "500 - Error en la Solicitud" });
            }
        },

        findBy: async (req, res) => { // Get a Post??
            try {
                const id = await Product.findById(req.params._id)
                res.status(200).send(id);
        
                if(!id){
                    console.error("ERROR", error);
                return res.status(404).send({ Mensaje: "404 - ID no Encontrado" })
                }
        
            } catch(error) {
                console.error("ERROR", error);
                res.status(500).send({ Mensaje: "500 - Error Interno" })
            }
        },

        update: async (req, res) => { 
            try {
                const product = await Product.findByIdAndUpdate(req.params._id, {
                    titulo: req.body.titulo,
                    categoria: req.body.categoria,
                    url: req.body.url,
                    precio: req.body.precio
                }, { new: true })

                if (!product) {
                    return res.status(404).send({ Mensaje: "404 - Producto no Encontrado" });
                }
                
                res.redirect("/id-html")
            } catch(error) {
                console.error("ERROR", error);
                res.status(500).send({ Mensaje: "500 - Error Interno" })
            }
        },

    deleteProduct: async (req, res) => { 
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
        },        
    }    

module.exports = productController