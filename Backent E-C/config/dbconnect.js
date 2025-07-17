import mongoose  from "mongoose";


const dbConnect=async()=>{
      try{
            const connected=mongoose.connect('mongodb+srv://i-autogen:DyEKVLBzIWY5nJzx@nodejs-ecommerce-api.s09uij8.mongodb.net/nodejs-ecommerce-api?retryWrites=true&w=majority&appName=nodejs-ecommerce-api');
            mongoose.set('strictQuery',true);
            console.log(` mongo connected ${(await connected).connection.host}` )

      }catch(error){
            console.log(`Error:${error.message}`);

            process.exit(1);//use for err aya tho process ko turant band kar do 
      }
};

export default dbConnect;


//username:i-autogen
//DyEKVLBzIWY5nJzx
//ip-(103.182.10.170)