import productModel from "../models/productModel.js";
import productValidator from "../validiations/productValidation.js";


class ProductController{
    createProduct = async(req,res)=>{
        try{
            const {errors} = productValidator.validate(req.body,{abortEarly:false})

            if(errors){
                const error=errors.details.map(err=>err.message)
                return res.status(400).json({
                    message:error
                })
            }


            const data = await productModel.create(req.body);
            if(!data){
                throw new Error("Failed");
            }
            return res.status(200).json({
                message:"Tạo thành công",
                data
            })
    
        }
        catch(e){
            return res.json({
                name:e,
                message:e.message
            })
        }
    }

    getProduct=async(req,res)=>{
        try{
            const data= await productModel.find()

            if(!data || data.length==0){
                throw new Error("Lỗi")
            }
            
            //Lấy thành công thì trả về dữ liệu
            return res.status(200).json({
                message:"Lấy dữ liệu thành công",
                data
            })
        }
        catch(e){
            console.log(e)
            console.log("Không lấy được data product")
            return res.status(500)
        }
    }

    getProductById=async(req,res)=>{
        try{
            const data= await productModel.findById(req.params.id);

            if(!data){
                throw new Error("Lỗi")
            }
            
            //Lấy thành công thì trả về dữ liệu
            return res.status(200).json({
                message:"Lấy dữ liệu thành công",
                data
            })
        }
        catch(e){
            console.log(e)
            console.log("Không lấy được data product")
            return res.status(500)
        }
    }

    updateProduct=async(req,res)=>{
        try{
            const data=await productModel.findByIdAndUpdate(req.params.id,req.body,{new:true, runValidators:true});

            if(!data){
                console.log("Sản phẩm không tồn tại")
                throw new Error("Lỗi")
            }

            return res.status(500).json({
                message:"Sửa sản phẩm thành công",
                data
            })
        }
        catch(e){
            console.log(e)
            console.log("Không lấy được data product")
            return res.status(500)
        }
    }

    deleteProduct=async(req,res)=>{
        try{
            const data=await productModel.findByIdAndDelete(req.params.id);

            if(!data){
                throw new Error("Không có sản phẩm này");
            }

            return res.status(500).json({
                message:"Đã xóa sản phẩm thành công"
            })
        }
        catch(e){
            return{
                name:e.name,
                message:e.message
            }
        }
    }

}


export default new ProductController
