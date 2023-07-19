import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
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

export default function CartScreen(){
    const {id} = useParams();
    const filmId = id;
    const {search} = useLocation();
    const nrInUrl = new URLSearchParams(search).get('nr');
    const nr = nrInUrl? Number(nrInUrl):1;


    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;
    const navigate = useNavigate();

    const dispatch = useDispatch();
    useEffect(()=>{
        if(filmId){
            dispatch(addToCart(filmId, nr));
        }
    }, [dispatch, filmId, nr]);

    const removeFromCartHandler=(id)=>{
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate('/signin?redirect=/shipping');
    }

    return (
        <div className='row top'>
            <div className='col-2'>
                <h1>Cos de cumparaturi</h1>
                {cartItems.length ===0? (<MessageBox>
                    Cosul de cumparaturi este gol. <Link to="/">Continua rezervarile!</Link>
                </MessageBox>)
                :(
                <ul>
                    { cartItems.map((item) => (
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
                                <div>
                                    <select
                                     value={item.nr}
                                      onChange={(e)=>
                                      dispatch(
                                          addToCart(item.film, Number(e.target.value)))}>
                                      {[...Array(item.countInStock).keys()].map( 
                                                    (x)=> (
                                                        <option key={x+1} value={x+1}>{x+1}</option>
                                                    )
                                                    )}
                                    </select>
                                </div>
                                <div>{item.price} RON</div>
                                <div>
                                    <button type="button" onClick={()=> removeFromCartHandler(item.film)}>Sterge</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>    
                )}
            </div>
            <div className='col-1'>
                <div className='card card-body'>
                    <ul>
                        <li>
                        Subtotal ({cartItems.reduce((a, c) => a + c.nr, 0)} Bilete) : RON
                        {cartItems.reduce((a, c) => a + c.price * c.nr, 0)}
                        </li>
                        <button type="button" onClick={checkoutHandler} className="primary block" disabled={cartItems.length===0}>
                            Finalizare comanda
                        </button>
                    </ul>
                </div>
            </div>
        </div>
    );
}

