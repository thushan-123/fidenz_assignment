import mongoose from 'mongoose';

const connectDb = async (uri) => {
    mongoose.set("strictQuery",  true);

    await mongoose.connect(uri, {
        autoIndex: true,
    });
    console.log("Connected to  mongodb dbConfig");
}

export default connectDb;