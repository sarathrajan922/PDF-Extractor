import { Schema,model } from "mongoose";

const userSchema = new Schema({
    email:{
        type:String,
        required:[true, 'please provide a email']
    },
    name:{
        type:String,
        required:[true,'please provide a username']
    }
});

const UserModel = model('users',userSchema,'user');

export default UserModel;