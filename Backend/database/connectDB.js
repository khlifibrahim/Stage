import fs from "fs";
import path from "path";
// import mongoose from "mongoose";
import mysql from 'mysql2/promise';


// export const connectDB = async () => {
//     try {
//         console.log("mongo_uri(line 5): " , process.env.MONGO_URI)
//         const con = await mongoose.connect(process.env.MONGO_URI)
//         console.log(`Mongo connected: ${con.connection.host}`)
//     }catch (e) {
//         console.log(`Error connect => `,e.message)
//         process.exit(1)
//     }
// }



export const connectSQL = async () => {

    try {
        const connection = await mysql.createConnection({
          host: process.env.DB_HOST,
          user: process.env.DB_USER,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_NAME,
          port: process.env.DB_PORT,
          waitForConnections: true,
          connectionLimit: 10, 
          queueLimit: 0
        });
    
        console.log('Connected to the MySQL database.', process.env.DB_NAME , ' ', process.env.DB_WB);
    
        
        // const [rows, fields] = await connection.execute('SELECT * FROM profile');
        // console.log('Data fetched successfully:', rows);
    
        
        // await connection.end();

        return connection;
      } catch (error) {
        console.error('Error conect to the database:', error);
      }
}
