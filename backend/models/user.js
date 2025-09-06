import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        trim: true
    },
    last_name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,

        // required: function() {
        //     return !this.auth0Id;
        // }
    },
    password: {
        type: String,

        // required: function() {
        //     return !this.auth0Id;
        // }
    },
    auth0Id: {
        type: String,
        unique: true,
        sparse: true
    },
}, { timestamps: true });

userSchema.pre("save", async function (next) {

    if (!this.isModified("password") || !this.password) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (password) {
    if (!this.password) return false;
    return bcrypt.compare(password, this.password);
};

export default mongoose.model("User", userSchema);

