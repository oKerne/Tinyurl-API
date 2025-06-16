import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); 


mongoose.set('toJSON', {
  virtuals: true,
  transform: (doc, converted) => {
    delete converted._id;
  }
});

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(" Database Connected");
  } catch (error) {
    console.error(" Database connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
