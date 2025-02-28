import { Router } from "express";
import productController from "../controllers/productController.js";

const productRouter=Router();
//create
productRouter.post("/createProduct",productController.createProduct)
//read,get
productRouter.get("/getAll",productController.getProduct)
productRouter.get("/getById/:id",productController.getProductById)
//update
productRouter.put("/updateProduct/:id",productController.updateProduct)
//delete
productRouter.delete("/deleteProduct/:id",productController.deleteProduct)


export default productRouter