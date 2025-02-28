import userModel from "../models/userModel.js"

class AuthController{
    signUp=async(req,res)=>{
        try{
            const data= await userModel.create(req.body)

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