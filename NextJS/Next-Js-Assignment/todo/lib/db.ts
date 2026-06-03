import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }
    const connection = await mongoose.connect(process.env.MONGO_URI!);
    console.log(`MongoDB connected: ${connection.connection.host}`);
}

export default connectDB;