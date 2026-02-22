let express = require("express");
let router = express.Router();
const database = require("../database");

console.log("express router", router);

router.get("/sum", (req, res) => {
  let { a, b } = req.query;
  let sum = parseInt(a) + parseInt(b);
  res.send("sum" + " " + sum);
});

router.post("/create", async (req, res) => {
  const { name, category, price } = req.body;
  await database.InsertProduct({ name, category, price });
  res.send("data inserted");
});

module.exports = router;
