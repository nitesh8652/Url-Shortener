import dotenv from "dotenv"
import express from "express"
import { nanoid } from "nanoid";
import connectDB from "./src/config/mongo.config.js"
import shorturl from "./src/models/Model.js"
import authentication from "./src/Routes/authentication.Routes.js"
import "./src/Routes/Routes.js" 
import shorturlRouter from "./src/Routes/Routes.js"
import { redirectfromshorturl } from "./src/Controller/Controller.js";
import { errorHandler } from "./src/Utils/ErrorHandling.js";
import cors from "cors";
import { attach } from "./src/Utils/attach.js";
import cookieParser from "cookie-parser"; 
import UserRoutes from "./src/Routes/UserRoutes.js";

dotenv.config()


const app = express();

// app.use(cors())

app.use(cors({
    // origin:'https://url-shortener-frontend-ving.onrender.com',
    origin:'process.env.APP_URL',
    credentials: true,
       methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}))

app.use(express.json())
app.use(cookieParser()) 
app.use(attach)
app.use(express.urlencoded({ extended: true }))
app.use('/api/user' ,UserRoutes)

app.use('/api/authentication',authentication)
app.use('/api/create',shorturlRouter)

app.get("/:id", redirectfromshorturl)


app.get('/', (req, res) => {
    res.send('API is running!');
});

app.use(errorHandler)

app.listen(3000, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});

