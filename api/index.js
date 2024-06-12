import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
dotenv.config();
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected');
}).catch((err)=>{
    console.log(err);
});

app.listen(3000,()=>{
    console.log("Server running");
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);

app.use((err,req,res,next) => {
    const statuscode = err.statuscode||500 ;
    const message =  err.message || 'Internal server error';
    return res.status(statuscode).json({
        success: false,
        error: message,
        statuscode,
    });
})