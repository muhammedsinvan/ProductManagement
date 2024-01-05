import mongoose from "mongoose";

const favariteSchema = mongoose.Schema({
    productId:({type:String,required:true})
})


const favarite = mongoose.model('Favarite', favariteSchema)

export default favarite;
