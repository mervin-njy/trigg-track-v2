require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");
// const Products = require("./models/Products");
// const { products: productSeed } = require("./data/seed");
// const enquiryFormRouter = require("./router/enquiryForm");
// const productsRouter = require("./router/products");
// const checkoutRouter = require("./router/checkout");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Add routers
// app.use("/enquiryForm", enquiryFormRouter);
// app.use("/products", productsRouter);
// app.use("/checkout", checkoutRouter);

const PORT = process.env.PORT || 5001;
const URI = process.env.MONGODB_CONNECTION_STRING;

connectDB(URI);

// // Initial setup - seed cookies
// app.put("/seedCookies", async (req, res) => {
//   try {
//     await Products.deleteMany();
//     await Products.create(productSeed);
//     return res.json({ status: "OK", message: "Seeds planted successfully!" });
//   } catch (err) {
//     return res.status(400).json({ status: "Error", message: err.message });
//   }
// });

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
