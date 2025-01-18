import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';


import { connectDB, connectSQL } from './database/connectDB.js'
import authRoutes from './routes/auth.route.js'
import orderMission from './routes/orderMission.route.js';


const port = process.env.PORT || 3000
dotenv.config();
const app = express();


app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json())
app.use('/api/auth', authRoutes);
app.use('/api/orderMission', orderMission)

app.get("/", (req, res) => {
    
});

app.listen(port, async () => {
    try{
        connectSQL();
        console.log(`Server is running on ${port}`)
    }catch(error) {
        console.log('Error while starting the server: ', error)
    }
})