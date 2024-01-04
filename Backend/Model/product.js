import mongoose from "mongoose";

const addproductSchema = mongoose.Schema({
    title:({type:String,required:true}),
    ram:({type:String,required:true}),
    price:({type:String,required:true}),
    subcategory:({type:String,required:true}),
    category:({type:String,required:true}),
    discription:({type:String,required:true}),
    qty:({type:String,required:true}),
    image1:({type:String,required:true}),
    image2:({type:String,required:true})
})

addproductSchema.index({ title: 'text', ram: 'text', discription: 'text' });

const product = mongoose.model('Product', addproductSchema)

export default product;