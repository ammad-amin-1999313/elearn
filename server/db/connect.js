import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const MongoUrl = process.env.MONGO_URL

const connectDB = async () => {
    try {
        await mongoose.connect(MongoUrl,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit the process with failu
    }
}

export default connectDB