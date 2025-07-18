import mongoose  from "mongoose";


const dbConnect=async()=>{
      try{
            // console.log("URL =>", process.env.MONGO_URL);//for checking run or not

            const connected=await mongoose.connect( process.env.MONGO_URL);
            mongoose.set('strictQuery',true);
            console.log(` mongo connected ${( connected).connection.host}` )

      }catch(error){
            console.log(`Error:${error.message}`);

            process.exit(1);//use for err aya tho process ko turant band kar do 
      }
};

export default dbConnect;


//username:i-autogen
//DyEKVLBzIWY5nJzx
//ip-(103.182.10.170)