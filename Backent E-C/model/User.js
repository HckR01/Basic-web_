import mongoose  from "mongoose";
const Schema=mongoose.Schema;

// user schema here

const UserSchema=new Schema({
      fullname:{
            type:String,
            required:true
      },
      email:{
            type:String,
            required:true,
      },
      password:{
            type:String,
            required:true
      },
      orders:[
            {type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
      },
      ],
      wishLists:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "WishList",
      

      },
],
isAdmin:{
      type:Boolean,
      default:false
},
isAdmin:{
      type:Boolean,
      default:false
},
hasShippingAddress:{
      type:Boolean,
      default:false
},
shippingAddress:{
      firstname: {
            type:String,
      },
      lastname: {
            type:String,
      },
      address: {
            type:String,
      },
      city: {
            type:String,
      },
      postalCode: {
            type:String,
      },
      country: {
            type:String,
      },
      phone: {
            type:String,
      },
     
}   
},{
      timestamps:true
}
);

//compile this schema to model
const User=mongoose.model("User",UserSchema);
export default User;//mongoose.model() kya karta hai? ye schema ko model me convert karta hai, jisse tum MongoDB ke data ke saath kaam kar sako (insert, find, delete, etc.).
