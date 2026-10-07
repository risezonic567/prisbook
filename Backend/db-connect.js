import mongoose from "mongoose";

const DBconnect = async () => {
  try {
    await mongoose.connect(process.env.DB_KEY)
    console.log("Database is Connected ✅")
  } catch (error) {
    console.log("DB Error ❌", error)
  }
}

export default DBconnect;