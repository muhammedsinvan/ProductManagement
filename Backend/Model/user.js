import mongoose from 'mongoose';

const userShema = mongoose.Schema({
    username:{type:String, required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
})

const user = mongoose.model('User',userShema)

export default user;