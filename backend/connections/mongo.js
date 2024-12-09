import mongoose from "mongoose";
import "dotenv/config";
const connectionURL = process.env.MONGOURL;
async function mongoConnect() {
  try {
    const connection = await mongoose.connect(connectionURL);
    console.log("DB Connected SuccesFully");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
export default mongoConnect;
