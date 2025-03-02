import userModel from "../models/userModel.js"
import 'dotenv/config'
import { signInValidator, signUpValidiator } from "../validiations/authValidation.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class AuthController{
    signUp=async(req,res)=>{
        try{
            const {error} = signUpValidiator.validate(req.body,{abortEarly:false});
            // 
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

    singIn=async(req,res)=>{
        try{
            const {errors} =signInValidator.validate(res.body,{abortEarly:false});

            if(errors){
                const error = errors.details.map(err=>err)

                return res.status(500).json({
                    message:error
                })
            }

            const userExist = await userModel.findOne({email:req.body.email});

            if(!userExist){
                return res.status(500).json({
                    message:"Không có người dùng này"
                })
            }

            const isMatch= bcrypt.compare(
                req.body.pwd,
                userExist.pwd
            )

            if(!isMatch){
                return res.status(500).json({
                    message:"Mật khẩu không đúng nhập  lại"
                });
            }

            const accessToken = jwt.sign({_id:userExist._id},process.env.SECRECT_CODE,{expiresIn:"1d"});

            userExist.pwd=undefined;

            return res.status(200).json({
                message:"Succesfully",
                data:userExist,
                accessToken,
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