import express from 'express';
import connectDb from "./dbConfig/db.js";
import helmet from 'helmet';
import 'dotenv/config'
import cors from "cors"
import morgan from "morgan";
import user from './routes/userRoutes.js';
import weather from './routes/weatherRoutes.js';
import {authentication} from "./middlewares/authentication.js";
import cookieParser from "cookie-parser";

const app = express();

// middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

// app.use("/api/v1", (req, res, next) => {
//     next();
// });
app.use(cookieParser());
app.use(authentication);

app.use("/api/v1/user" ,user);
app.use("/api/v1",weather);


app.use((req, res, next) => {
    res.status(404).json({
        "message": "path is not found"
    })
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({
        "message": "Error occur"
    })
})

const PORT = process.env.PORT || 9000;
const MONGO_URI = process.env.MONGO_URI;

connectDb(MONGO_URI).then(
    () => app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT} :) :)`);
    }))
    .catch(
        (error) => {
            console.log(error.message);
            process.exit(1);
        }
    )