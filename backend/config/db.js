// database connection file to MongoDB
import { mongoose } from "mongoose";

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URI, {
//       useUnifiedTopology: true,
//       useNewUrlParser: true,
//     })
//     console.log(`mongodb connected: ${conn.connection.host}`.cyan.underline)
//   } catch (error) {
//     console.log(`Error: ${error.message}`.underline.bold)
//     process.exit(1)
//   }
// }
mongoose.connect(
  "mongodb+srv://test-user:xY7Nqa0vCjFlmeRl@cluster0.u5jjg2x.mongodb.net/routes?retryWrites=true&w=majority&appName=Cluster0"
);

export default connectDB;
