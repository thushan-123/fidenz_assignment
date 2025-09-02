import express from 'express';
import db from "database/db.js"
import helmet from 'helmet';
import 'dotenv/config'
import cors from "cors"
import morgan from "morgan";

const app = express();

// middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
