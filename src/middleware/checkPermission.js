import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import userModel from '../models/userModel'

dotenv.config()

const checkPermission=async(req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1]

        if(!token){
            throw new Error("Lỗi không có token")
        }
        
        const decoded= jwt.verify(token,process.env.SECRECT_CODE);
        if(!decoded){
            throw new Error("Lỗi phân tích ")
        }

        const user = await userModel.findById(decoded._id)
        if(!user){
            throw new Error("Không tìm thấy người dùng")
        }

        if(user.role!=="admin"){
            throw new Error("Bạn không phải admin");
        }

        next()

    }
    catch(e){
        return res.status(400).json({
            error:e
        })
    }

}