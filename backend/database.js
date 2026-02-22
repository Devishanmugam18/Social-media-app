const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
const uri = "mongodb://localhost:27017";

console.log("connection started");

async function InsertProduct(data) {
  const client = new MongoClient(uri);
  await client.connect();
  console.log("database connected");

  const database = client.db("E-commerce");
  console.log("databse selected");

  const collection = database.collection("Products");
  console.log("collection selected");

  await collection.insertOne(data);
  console.log("inserted successfully");
  //   client.close();
}

//get products
async function getProducts() {
  const client = new MongoClient(uri);
  await client.connect();
  console.log("database connected");

  const database = client.db("E-commerce");
  console.log("databse selected");

  const collection = database.collection("Products");
  console.log("collection selected");

  const products = await collection.find().toArray();
  console.log("raed successfully");
  await client.close();
  return products;
}

//delete product by name
async function deleteProduct(data) {
  const client = new MongoClient(uri);
  await client.connect();
  console.log("database connected");

  const database = client.db("E-commerce");
  console.log("databse selected");

  const collection = database.collection("Products");
  console.log("collection selected");

  await collection.deleteOne({ name: data.name });
  console.log("deleted successfully");
  //   client.close();
}

//delete by id

async function deleteProductById(id) {
  const client = new MongoClient(uri);
  await client.connect();
  console.log("database connected");

  const database = client.db("E-commerce");
  console.log("databse selected");

  const collection = database.collection("Products");
  console.log("collection selected");

  await collection.deleteOne({ _id: new ObjectId(id) });
  console.log("deleted successfully");
  //   client.close();
}

//edit by id
async function editProductById(id, data) {
  const client = new MongoClient(uri);
  await client.connect();
  console.log("database connected");

  const database = client.db("E-commerce");
  console.log("databse selected");

  const collection = database.collection("Products");
  console.log("collection selected");

  await collection.updateOne({ _id: new ObjectId(id) }, { $set: data });
  console.log("deleted successfully");
  //   client.close();
}

// InsertProduct({ name: "whirlpool", imag: "wedefr", price: 25000 });
module.exports = {
  InsertProduct,
  deleteProduct,
  deleteProductById,
  editProductById,
  getProducts,
};
