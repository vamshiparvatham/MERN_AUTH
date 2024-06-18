import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();
const app = express();

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname,'/client/dist')))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client', 'dist', 'index.html'));
})

app.use(express.json());
app.use(cookieParser());

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