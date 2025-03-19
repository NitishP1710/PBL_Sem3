const mongoose=require("mongoose");
require("dotenv").config();
 
const connectDatabase=()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{console.log("Database connected succesfully")})
    .catch((e)=>{console.log("Issue in server connection");
        console.error(e.message);
        process.exit(1)});
}
module.exports=connectDatabase;