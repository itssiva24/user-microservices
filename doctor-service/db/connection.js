import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config()

const db = process.env.DATABASE_URL

const connectMongo = async () => {
    try {
        console.log("connecting mongoose");
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connect success");
    } catch (err) {
        console.log("Error in connecting database---->", err);
    }
}
export default connectMongo