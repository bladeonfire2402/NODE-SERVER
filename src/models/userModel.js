import mongoose from "mongoose";

const UserModel = mongoose.Schema({
    userName:{
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
    },
    userRole:{
        type:String,
        default:"member"
    }
},{
    timestamps:true,
    versionKey:false
})

export default mongoose.model("user",UserModel);

