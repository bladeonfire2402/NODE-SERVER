import { Router } from "express";
import productRouter from "./productRouter.js";
import authRouter from "./authRouter.js";


const indexRouter = Router()

indexRouter.use("/product/",productRouter)
indexRouter.use("/auth",authRouter)

export default indexRouter