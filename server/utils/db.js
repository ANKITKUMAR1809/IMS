const mongoose= require("mongoose")

 const URI=process.env.MONGODB_URI
 const connectDb=async ()=>{
     try {
      await  mongoose.connect(URI)
        console.log("Database Connected Successfully...")
    } catch (error) {
        console.log("Failed to connect with Database")
        console.log(error)
        process.exit(0)
    }
}

module.exports= connectDb;