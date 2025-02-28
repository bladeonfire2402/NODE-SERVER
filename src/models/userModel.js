import mongoose, { version } from "mongoose";

const UserModel = mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    pwd:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    }
},{
    timestamps:true,
    versionKey:false
})

export default mongoose.model("user",UserModel);

