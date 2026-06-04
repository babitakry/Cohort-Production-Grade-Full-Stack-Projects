import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    const conn = await mongoose.connect(process.env.MONGO_URI!);
    // console.log(`MongoDB: ${conn.connection}`);
    console.log(`MongoDB connected: ${conn.connection.host}`);
}

export default connectDB;