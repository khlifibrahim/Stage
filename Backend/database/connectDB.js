import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        console.log("mongo_uri(line 5): " , process.env.MONGO_URI)
        const con = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongo connected: ${con.connection.host}`)
    }catch (e) {
        console.log(`Error connect => `,e.message)
        process.exit(1)
    }
}