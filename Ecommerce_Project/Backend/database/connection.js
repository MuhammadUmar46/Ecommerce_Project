import mongoose from "mongoose"

const dbConnection = async () => {
   try {
       const connect = await mongoose.connect(process.env.MONGO_URL)
       console.log("Database has been Connected")
   } catch (error) {
      console.log(`Error in connection ${error}`)
   }
}

export default dbConnection;