import userModel from "../models/userModel.js"
import 'dotenv/config'
import { signUpValidiator } from "../validiations/authValidation.js"
import bcrypt from 'bcrypt'


class AuthController{
    signUp=async(req,res)=>{
        try{
            const {error} = signUpValidiator.validate(req.body,{abortEarly:false});
            if(error){
                const errors = error.details.map(err=>err.message)
                return res.status(400).json({
                    message:errors
                })
            }

            const userExist= await userModel.findOne({email:req.body.email})

            if(userExist){
                return res.status(500).json({
                    message:"Đã tồn tại người dùng này"
                })
            }

            const hashedPassword=await bcrypt.hash(req.body.pwd,10)
            

            const data= await userModel.create({
                ...req.body,
                pwd:hashedPassword,
            })

            //Gán pwd bằng underfined để tí in ra pwd sẽ dấu đi password
            data.pwd=undefined;

            if(!data){
                throw new Error("Lỗi rồi")
            }

            return res.status(500).json({
                message:"Tạo user thành công",
                data
            })

        }
        catch(e){
            return res.status(500).json({
                message:e
            })

        }
    }
}

export default new AuthController