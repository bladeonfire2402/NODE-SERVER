import mongoose from "mongoose";

const connectDB = async () =>{
    try{
        //Lấy uri
        const URI=process.env.MONGO_URI;
        //Tạo kết nối với DB
        const DBConnect= await mongoose.connect(URI)
        //Tạo connection
        const connection = mongoose.connection;

        //in ra kết quả thành công khi kết nối được DB
        console.log("Kết nối được với Database")

    }
    catch(err){
        console.log(err);
        console.log("Không kết nối được Database")
    }

} 
export default connectDB