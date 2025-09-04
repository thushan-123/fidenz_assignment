import express from 'express';
import connectDb from "./dbConfig/db.js";
import helmet from 'helmet';
import 'dotenv/config'
import cors from "cors"
import morgan from "morgan";

import {authentication} from "./middlewares/authentication";

const app = express();

// middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(authentication)




const PORT = process.env.PORT || 8000;
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