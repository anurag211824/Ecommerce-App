import mongoose from "mongoose";

// logic using that we can connect our mongoose package  form the mongoDb atlas server
const connectDb=async()=>{
    mongoose.connection.on('connected',()=>{
        console.log('DB Connected');
        
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)

}

export default connectDb