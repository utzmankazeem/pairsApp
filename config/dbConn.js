import dotenv from 'dotenv';
dotenv.config()
import mongoose from 'mongoose';
const isProduction = process.env.NODE_ENV === 'production'
const dbUri = isProduction ? process.env.DATABASE_URI : process.env.DATABASE_URI_LOCAL
const connectDB = async () => {
    try {
        await mongoose.connect(dbUri, {
            family: 4
        })
    } catch (error) {
        throw error
    }
}
export default connectDB;