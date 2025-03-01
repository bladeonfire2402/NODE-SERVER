//Theo kiểu module
import express from 'express'
import cors from "cors"
import 'dotenv/config';
import connectDB from './src/DBconnect/dbConnect.js';
import indexRouter from './src/Routes/indexRouter.js';

const app =express()
// Lấy port từ biến môi trường
const PORT= process.env.PORT

//Middleware để chuyển req.body sang định dạng dữ liệu json
app.use(express.json())
//Kích hoạt cors cho tất cả request 
app.use(cors())

//Kết nối DB
connectDB()

app.use('/api',indexRouter)


app.listen(PORT,()=>{
   console.log(`Server đang chạy ở port ${PORT}`)
})