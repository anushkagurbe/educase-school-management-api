import "dotenv/config";
import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import schoolRoutes from "./routes/schoolRoutes.js";

let db;

export let getDb = ()=> db;

let connectDb = async () => {
    try 
    {
        db = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            port: process.env.DB_PORT,
        });
        console.log("MySQL Connected");
    } 
    catch(error) 
    {
        console.error("DB Connection Failed:", error.message);
        process.exit(1);
    }
};

let app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use("/api", schoolRoutes);

let startServer = async()=>{
    await connectDb();
    app.listen(process.env.PORT, ()=>{
        console.log(`Server running on port ${process.env.PORT}`);
    })
}

startServer();
