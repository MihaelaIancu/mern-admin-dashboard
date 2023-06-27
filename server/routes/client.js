import express from "express";
import {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
  addProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/client.js";

const router = express.Router();

router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);
router.post("/addProduct", addProduct);
router.delete("/products/:id", deleteProduct);
router.put("/products/:id", updateProduct);

export default router;
