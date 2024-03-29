import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import { isAdmin, isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.get('/', isAuth, isAdmin, expressAsyncHandler(async(req, res)=>{
    const orders = await Order.find({}).populate('user', 'name');
    res.send(orders);
}));

orderRouter.get('/mine', isAuth, expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({user: req.user._id});
    res.send(orders);
}));
orderRouter.post('/', 
// eslint-disable-next-line no-undef
isAuth,
expressAsyncHandler(async(req, res) => {
    if(req.body.orderItems.length ===0){
        res.status(400).send({message: 'Cosul dvs. este gol'});
    }
    else{
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id
        });
        const createdOrder = await order.save();
        res.status(201).send({message: 'Noua comanda creata', order: createdOrder});
    }
}));

orderRouter.get('/:id', isAuth, expressAsyncHandler(async(req, res)=>{
    const order = await Order.findById(req.params.id);
    if(order){
        res.send(order);
    }else{
        res.status(404).send({message: "Comanda nu a fost gasita"});
    }
}));

orderRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async(req, res)=>{
    const order = await Order.findById(req.params.id);
    if(order) {
        const deletedOrder = await order.remove();
        res.send({message: 'Comanda stearsa', order: deletedOrder});

    }else{
        res.send(404).send({message: 'Comanda negasita'});
    }
}));

export default orderRouter;