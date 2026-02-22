// const express = require("express");
// const router = express.Router();
// const database = require("../database");
// const { default: mongoose } = require("mongoose");
// // const products = require("../products-model");

// router.post("/create", async (req, res) => {
//   const { name, imageUrl, price } = req.body;
//   await database.InsertProduct({ name, imageUrl, price });
//   res.send("data inserted");
// });

// router.post("/delete", async (req, res) => {
//   const { name, imageUrl, price } = req.body;
//   await database.deleteProduct({ name, imageUrl, price });
//   res.send("data deleted");
// });

// router.delete("/delete/:id", async (req, res) => {
//   const { id } = req.params;
//   await database.deleteProductById(id);
//   res.send("data deleted");
// });

// router.put("/edit/:id", async (req, res) => {
//   const { id } = req.params;
//   const data = req.body;
//   await database.editProductById(id, data);
//   res.send("data edited");
// });

// router.get("/get", async (req, res) => {
//   const data = await database.getProducts();
//   res.json(data);
// });

// router.post("/createUsingORM", async (req, res) => {
//   const data = req.body;
//   await products.create({ ...req.body });
//   res.json(data);
// });
// module.exports = router;
