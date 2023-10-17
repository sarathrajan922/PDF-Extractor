import mongoose from 'mongoose';
import ConfigKeys from '../common/config';

const connectDB = async ()=>{
    const dbObject = {
        dbName: ConfigKeys.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try{
        await mongoose.connect(ConfigKeys.MONGODB_URL,dbObject);
        console.log(`Database connect successfully`)
    }catch(error){
        console.log(error);
        process.exit(1)
    }

}

export default connectDB;