import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps'

export default function ShippingScreen() { 
    // eslint-disable-next-line no-undef
    const userSignIn = useSelector(state=>state.userSignIn);
    const {userInfo } = userSignIn;
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;
    const navigate = useNavigate();

    useEffect(()=>{
        if(!userInfo){
            // eslint-disable-next-line no-undef
            navigate('/signin')
        }
    },[navigate, userInfo])
    
    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [mail, setMail] = useState(shippingAddress.mail || '');
    const [city, setCity] = useState(shippingAddress.city || '');

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({fullName, mail, city}));
        navigate('/payment');
    }
    return(
        <div>
            <CheckoutSteps step1 step2></CheckoutSteps>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Generare bilet</h1></div>
            <div>
                <label htmlFor='fullName'>Nume Client</label>
                <input 
                type="text" 
                id="fullName" 
                placeholder="Introduceti numele" 
                value={fullName} 
                onChange={(e)=>setFullName(e.target.value)} 
                required></input>
            </div>
            <div>
                <label htmlFor='mail'>Adresa de mail</label>
                <input 
                type="text" 
                id="email" 
                placeholder="Introduceti adresa de email" 
                value={mail} 
                onChange={(e)=>setMail(e.target.value)} 
                required></input>
            </div>
            <div>
                <label htmlFor='city'>Oras</label>
                <input 
                type="text" 
                id="city" 
                placeholder="Introduceti orasul" 
                value={city}
                onChange={(e)=>setCity(e.target.value)} 
                required></input>
            </div>
            <div>
                <label/>
                <button className='primary' type='submit'>Continuare</button>
            </div>
            </form>
        </div>
    )
}