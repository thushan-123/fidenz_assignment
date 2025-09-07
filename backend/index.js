import express from 'express';
import connectDb from "./dbConfig/db.js";
import helmet from 'helmet';
import 'dotenv/config'
import cors from "cors"
import morgan from "morgan";
import userRoutes from './routes/userRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';
import cookieParser from "cookie-parser";
import auth0Routes from "./routes/auth0.js";

const app = express();

// Middleware - security
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true
}));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

//app.use(authentication);

// Routes
app.use("/api/v1/user/auth0", auth0Routes);
app.use("/api/v1/user/jwt", userRoutes);
app.use("/api/v1", weatherRoutes);

// Error handling
app.use((req, res) => {
    res.status(404).json({ message: "Path not found" });
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 9000;
const MONGO_URI = process.env.MONGO_URI;

connectDb(MONGO_URI)
    .then(() => app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
    }))
    .catch((err) => {
        console.error(err.message);
        process.exit(1);
    });
