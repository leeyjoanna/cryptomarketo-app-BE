import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const API_KEY = process.env.POLYGON_API

const config = { 
    MONGODB_URI, 
    PORT,
    API_KEY 
}
export default config
