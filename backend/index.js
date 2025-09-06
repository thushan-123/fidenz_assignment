import express from 'express';
import connectDb from "./dbConfig/db.js";
import helmet from 'helmet';
import 'dotenv/config'
import cors from "cors"
import morgan from "morgan";
import userRoutes from './routes/userRoutes.js';
import weatherRoutes from './routes/weatherRoutes.js';
import { authentication } from "./middlewares/authentication.js";
import cookieParser from "cookie-parser";
import { Strategy as Auth0Strategy } from "passport-auth0";
import session from "express-session";
import passport from "passport";
import User from "./models/user.js";
import auth0Routes from "./routes/auth0.js";
import MongoStore from 'connect-mongo';

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

// Session configuration
app.use(
    session({
        secret: process.env.SESSION_SECRET || "some_secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        },
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI,
            collectionName: 'sessions'
        })
    })
);

// Passport configuration
passport.use(
    new Auth0Strategy(
        {
            domain: process.env.AUTH0_DOMAIN,
            clientID: process.env.AUTH0_CLIENT_ID,
            clientSecret: process.env.AUTH0_CLIENT_SECRET,
            callbackURL: process.env.AUTH0_CALLBACK_URL || "http://localhost:9000/api/v1/user/auth0/callback",
            state: true // Enable state management
        },
        async (accessToken, refreshToken, extraParams, profile, done) => {
            try {
                let user = await User.findOne({ auth0Id: profile.id });

                if (!user) {
                    const email = profile.emails && profile.emails[0] && profile.emails[0].value;
                    if (email) {
                        user = await User.findOne({ email });
                    }

                    if (user) {
                        user.auth0Id = profile.id;
                        await user.save();
                    } else {
                        user = await User.create({
                            first_name: profile.name?.givenName || profile.given_name || profile.nickname || "",
                            last_name: profile.name?.familyName || profile.family_name || "",
                            email: email,
                            auth0Id: profile.id,
                        });
                    }
                }

                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/v1/user/auth0", auth0Routes);
app.use("/api/v1/user", authentication, userRoutes);
app.use("/api/v1", authentication, weatherRoutes);

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
