import React, { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { detailsOrder } from '../actions/orderActions';

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

export default function OrderScreen() {
    // eslint-disable-next-line no-undef
    const { id } = useParams();
    const orderId = id;

    // eslint-disable-next-line no-undef
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(detailsOrder(orderId));
    }, [dispatch, orderId]);
    
  return loading? (<LoadingBox></LoadingBox>
  ) : error? (
  <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
        <h1> Comanda {order._id} </h1>
        <div className='row top'>
            <div className='col-2'>
                <ul>
                    <li>
                        <div className='card card-body'>
                            <h2>Livrare</h2>
                            <p>
                                <strong>Nume: </strong> {order.shippingAddress.fullName} <br/>
                                <strong>Adresa: </strong> {order.shippingAddress.mail}, {order.shippingAddress.city}

                            </p>
                            {
                                order.isDelivered? <MessageBox variant="success">Livrata la {order.deliveredAt}</MessageBox>
                                :
                                <MessageBox variant="danger">Nelivrata</MessageBox>
                            }

                        </div>
                    </li>
                    <li>
                        <div className='card card-body'>
                            <h2>Plata</h2>
                            <p>
                                <strong>Metoda: </strong> {order.paymentMethod} <br/>
                            </p>
                            {
                                order.isPaid? <MessageBox variant="success">Platita la {order.paidAt}</MessageBox>
                                :
                                <MessageBox variant="danger">Neplatita</MessageBox>
                            }

                        </div>
                    </li>
                    <li>
                        <div className='card card-body'>
                            <h2>Bilete</h2>
                            <ul>
                    { order.orderItems.map((item) => (
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
                                {order.itemsPrice} RON
                            </div>                           
                        </div>
                    </li>


                    <li>
                        <div className='row'>
                            <div>
                                Taxa de generare bilet 
                            </div>
                            <div>
                                {order.taxPrice} RON
                            </div>                           
                        </div>
                    </li>

                    <li>
                        <div className='row'>
                            <div>
                                <strong>Total</strong>
                            </div>
                            <div>
                            <strong>{order.totalPrice} RON</strong>
                            </div>                           
                        </div>
                    </li>
                   </ul>
                </div>
            </div>
    </div>
  )
}
