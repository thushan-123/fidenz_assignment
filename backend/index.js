import express from 'express';
import connectDb from "database/db.js"
import helmet from 'helmet';
import 'dotenv/config'
import cors from "cors"
import morgan from "morgan";

const app = express();

// middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));




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