import { Router } from "express";
import productRouter from "./productRouter.js";
import authRouter from "./authRouter.js";
import checkPermission from "../middleware/checkPermission.js";

const indexRouter = Router()

indexRouter.use("/product/",checkPermission,productRouter)
indexRouter.use("/auth",authRouter)

export default indexRouter