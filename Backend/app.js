import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { connectDB } from './database/connectDB.js'
import authRoutes from './routes/auth.route.js'


const port = process.env.PORT || 3000
dotenv.config();
const app = express();


app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json())
app.use('/api/auth', authRoutes);

app.get("/", (req, res) => {
    
});

app.listen(port, () => {
    connectDB();
    console.log(`Server is running on ${port}`)
})