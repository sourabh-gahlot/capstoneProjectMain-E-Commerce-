const mongoose = require("mongoose")

const orderSchema= new mongoose.Schema({
  addressId:{
    type :String,
    required:true
  },
  productId:{
    type:String,
    required:true
  },
  quantity:Number
})

const Order=mongoose.model("order",orderSchema)

module.exports= Order