import express from 'express';
import mongoose from 'mongoose';
import filmRouter from './routers/filmRouter.js';
import userRouter from './routers/userRouter.js';
import dotenv from 'dotenv';
import orderRouter from './routers/orderRouter.js';
import uploadRouter from './routers/uploadRouter.js'
import path from 'path'

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// eslint-disable-next-line no-undef
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/cinema', {
    useNewUrlParser: true,
});

app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/films', filmRouter);
app.use('/api/orders', orderRouter);
app.get('/api/config/paypal', (req, res) => {
    // eslint-disable-next-line no-undef
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

let __dirname = path.resolve();
__dirname = path.join(__dirname, '../');
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/', (req, res)=>{
    res.send('Server is ready');
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next)=>{
    res.status(500).send({message: err.message});
});

// eslint-disable-next-line no-undef
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});