import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import {email} from "zod";


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: email(),
        required: true
    },

    password: {
        type: String,
    },
    authentications: {
        auth_provider: {
            auth_provider: {
                type: String
            },
            auth_id: {
                type: String
            }
        }
    }
}, {
    timestamps: true
})

userSchema.pre('save', async(next) => {
    if(!this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
})

userSchema.methods.comparePassword = async (password) => {
    return bcrypt.compare(password, this.password);
}

export default mongoose.model('User', userSchema);