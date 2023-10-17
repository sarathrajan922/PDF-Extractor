import dotenv from "dotenv"
dotenv.config();



const ConfigKeys = {
    PORT: process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL as string,
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET as string,
    // AWS_REGION: process.env.AWS_REGION as string,
    // AWS_SECRET_KEY: process.env.AWS_SECRET_KEY as string,
    // AWS_ACCESS_KEY_ID : process.env.AWS_ACCESS_KEY_ID as string,
    // AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME as string,
    // CLOUD_FRONT_DOMAIN_NAME:process.env.CLOUD_FRONT_DOMAIN_NAME as string
}



export default ConfigKeys;