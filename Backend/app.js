import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import jwt from 'jsonwebtoken';


import { connectSQL } from './database/connectDB.js';
import { initCronJobs } from './cron.js';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import mission from './routes/orderMission.route.js';
import enterprise from './routes/enterprise.route.js';
import control from './routes/control.route.js';
import control24 from './routes/control.route.js';
import products from './routes/products.route.js'
import pointVente from './routes/pointVente.route.js';
import statistics from './routes/statistics.route.js'
import object from './routes/object.route.js'
import indh from './routes/indh.route.js'
import notification from './routes/notification.route.js'


dotenv.config();
const app = express();
const port = process.env.PORT

app.use(cors());

app.use(express.json())

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes)
app.use('/api/missions', mission)
app.use('/api/enterprise', enterprise)
app.use('/api/control', control)
app.use('/api/control/24', control24)
app.use('/api/products', products)
app.use('/api/point_vente', pointVente)
app.use('/api/statistics',statistics)
app.use('/api/object',object)
app.use('/api/indh', indh)
app.use('/api/notifications', notification)


app.get("/", (req, res) => {
    res.send('App is running...')
});

app.listen(port, async () => {
    try{
        await connectSQL();
        initCronJobs();
        console.log(`Server is running on ${port}`)
    }catch(error) {
        console.log('Error while starting the server: ', error)
    }
})