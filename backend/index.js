import  express  from "express";
import connectDb from "./config/connectDb.js";
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

dotenv.config()

const app = express()
app.use(cors());

const port = process.env.PORT || 8000
const DATABASE_URL = process.env.DATABASE_URI

connectDb(DATABASE_URL)

// controllers

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.json())

// all the model routes



app.use(errorHandler)


app.listen(port, () => [
    console.log(`App running on port ${port}`)
])