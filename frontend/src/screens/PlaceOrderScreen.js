import React, { useEffect } from 'react';
import CheckoutSteps from '../components/CheckoutSteps';
import {useSelector, useDispatch} from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { createdOrder } from '../actions/orderActions';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('-');
}

function formatHour(date){
    var d = new Date(date),
        hours = '' + d.getHours(),
        minutes = '' + d.getMinutes();

    if (hours.length < 2)
        hours = '0' + hours;
    if (minutes.length < 2)
        minutes = '0' + minutes;
    return [hours, minutes].join(':');
}

export default function PlaceOrderScreen() {
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    useEffect(()=>{
        if(!cart.paymentMethod){
            navigate('/payment');
        }
    });

    const orderCreate = useSelector((state) => state.orderCreate);
    const {loading, success, error, order} = orderCreate;

    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(cart.cartItems.reduce((a, c) => a + c.nr * c.price, 0));
    cart.taxPrice = toPrice(0.05 * cart.itemsPrice);

    if(cart.totalPrice > 100){
        cart.totalPrice = cart.itemsPrice;
    }else{
        cart.totalPrice = cart.itemsPrice +cart.taxPrice;
    }

    const dispatch = useDispatch();

    const placeOrderHandler =() =>{
        dispatch(createdOrder({...cart, orderItems: cart.cartItems}))
    };

    useEffect(()=>{
        if(success){
            navigate(`/order/${order._id}`);
            dispatch({type: ORDER_CREATE_RESET});
        }
    }, [dispatch, order, navigate, success]);
    
  return (
    <div>
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
        <div className='row top'>
            <div className='col-2'>
                <ul>
                    <li>
                        <div className='card card-body'>
                            <h2>Livrare</h2>
                            <p>
                                <strong>Nume: </strong> {cart.shippingAddress.fullName} <br/>
                                <strong>Adresa: </strong> {cart.shippingAddress.mail}, {cart.shippingAddress.city}

                            </p>

                        </div>
                    </li>
                    <li>
                        <div className='card card-body'>
                            <h2>Plata</h2>
                            <p>
                                <strong>Metoda: </strong> {cart.paymentMethod} <br/>
                            </p>

                        </div>
                    </li>
                    <li>
                        <div className='card card-body'>
                            <h2>Bilete</h2>
                            <ul>
                    { cart.cartItems.map((item) => (
                        <li key={item.film}>
                            <div className='row'>
                                <div>
                                    <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="small"
                                    ></img>
                                </div>
                                <div className='min-30'>
                                    <Link to={`/film/${item.film}`}>{item.name}</Link>
                                </div>
                                <div>
                                    {formatDate(item.date)}
                                </div>
                                <div>
                                    {formatHour(item.date)}
                                </div>
                                <div>
                                    {item.room}
                                </div>
                                <div>{item.nr} x {item.price} = {item.nr*item.price}RON</div>
                            </div>
                        </li>
                    ))}
                </ul> 

                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div className='col-1'>
            <div className='card card-body'>
                <ul>
                    <li>
                        <h2>Rezumat Comanda</h2>
                    </li>
                    <li>
                        <div className='row'>
                            <div>
                                Bilete
                            </div>
                            <div>
                                {cart.itemsPrice} RON
                            </div>                           
                        </div>
                    </li>


                    <li>
                        <div className='row'>
                            <div>
                                Taxa de generare bilet 
                            </div>
                            <div>
                                {cart.taxPrice} RON
                            </div>                           
                        </div>
                    </li>

                    <li>
                        <div className='row'>
                            <div>
                                <strong>Total</strong>
                            </div>
                            <div>
                            <strong>{cart.totalPrice} RON</strong>
                            </div>                           
                        </div>
                    </li>
                    <li>
                        <button type="button" onClick={placeOrderHandler} className="primary block" disabled={cart.cartItems.length === 0}>Trimite comanda</button>
                    </li>
                    {
                        loading && <LoadingBox></LoadingBox>
                    }

                    {error && <MessageBox variant="danger">{error}</MessageBox>}
                </ul>
                </div>
            </div>
    </div>
  )
}
