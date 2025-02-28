import mongoose from "mongoose";

const productModel=mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true,
    },
    description:{
        type:String,
        require:true,
    }
},{
    timestamps:true,
    versionKey:false,
})

export default mongoose.model('Product',productModel)