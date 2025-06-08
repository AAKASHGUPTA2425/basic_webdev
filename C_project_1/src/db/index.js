import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectdb = async () => {
    try {
        const connectinstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(connectinstance);

        console.log(`MongoDB is connected: DB host ${connectinstance.connection.host}`);

    } catch (error) {
        console.error("error is obtained as", error)
        process.exit(1)
    }
}
export default connectdb