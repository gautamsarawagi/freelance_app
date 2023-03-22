import mongoose from "mongoose";

const connectDb = async (DATABASE_URI) => {
    try {
        const DB_OPTION= {
            dbName : "freelance_project"
        }

        await mongoose.set("strictQuery",false)
        await mongoose.connect(DATABASE_URI,DB_OPTION)
        console.log("Database Connected Successfully")
    } catch (error) {
        console.log(error)
    }
}

export default connectDb;