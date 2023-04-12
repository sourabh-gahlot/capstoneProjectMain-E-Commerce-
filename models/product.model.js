const mongoose = require("mongoose");

productSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  availableItems:{
    type :Number,
    required:true
  },
  price:{
    type :Number,
    required:true
  },
  category:{
    type :String,
    required:true
  },
  description:{
    type :String,
    required:true
  },
  manufacturer:{
    type :String,
    required:true
  },
  acessToken:{
    type :String
  },
  imageURl:String
})

const Product = mongoose.model("product",productSchema);
module.exports=Product