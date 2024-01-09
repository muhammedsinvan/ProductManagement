import mongoose from "mongoose";

const favariteSchema = mongoose.Schema({
    userid:({type:String,required:true}),
    products:[{
        productId:{type:String,required:true}
    }]
})


const favarite = mongoose.model('Favarite', favariteSchema)

export default favarite;
