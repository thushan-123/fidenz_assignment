import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true,
    },
    last_name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email'],
    },
    password: {
        type: String,
        required: true,
    },
    auth_id: {
        type: String
    }
    // authentications: {
    //     auth_provider: {
    //         auth_provider: {
    //             type: String,
    //         },
    //         auth_id: {
    //             type: String,
    //         },
    //     },
    // },
}, { timestamps: true });


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);
