import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';


import { connectSQL } from './database/connectDB.js'
import authRoutes from './routes/auth.route.js'
import userRoutes from './routes/user.route.js'
import mission from './routes/orderMission.route.js';


const port = process.env.PORT || 3000
dotenv.config();
const app = express();


// Middlewares
app.use(cors({ 
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    credentials: true,
}));
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes)
app.use('/api/missions', mission)


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