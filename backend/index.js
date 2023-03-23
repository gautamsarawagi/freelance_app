import  express  from "express";
import connectDb from "./config/connectDb.js";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import errorHandler from "./middleWares/errorMiddleWare.js"
import path from "path"
import userRoutes from "./routes/userRoutes.js"
import authRoutes from "./routes/authRoutes.js"

dotenv.config()

const app = express()

const port = process.env.PORT || 8000
const DATABASE_URL = process.env.DATABASE_URI

connectDb(DATABASE_URL)

// controllers
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use("/uploads", express.static(path.join(path.dirname(import.meta.url), "uploads")));

// all the model routes

app.use("/api/user",userRoutes)
app.use("/api/auth",authRoutes)

app.use(errorHandler)


app.listen(port, () => [
    console.log(`App running on port ${port}`)
])