import React, { useEffect, useState } from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function SignInsCreen(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // eslint-disable-next-line no-undef
    const {search} = useLocation();
    const navigate = useNavigate();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/';

    const userSignIn = useSelector((state)=> state.userSignIn);
    const {userInfo, loading, error} = userSignIn;

    const dispatch = useDispatch();

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(signin(email, password));
    };

    useEffect(()=>{
        if(userInfo){
            navigate(redirect);
        }
    }, [redirect, userInfo, navigate]);

    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                <h1>Logare in cont</h1>
                </div>

                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant='danger'>{error}</MessageBox>}
                <div>
                    <label htmlFor='email'>Adresă de mail</label>
                    <input className='mail' type='email' id='email' placeholder='Enter email' required onChange={ e=> setEmail(e.target.value)}></input>
                </div>

                <div>
                    <label htmlFor='password'>Parolă</label>
                    <input className='pass' type='password' id='password' placeholder='Enter password' required onChange={ e=> setPassword(e.target.value)}></input>
                </div>

                <div>
                    <label />
                    <button className='primary' type='submit'>Sign In</button>
                </div>
                <div>
                    <label />
                    <div>
                        Client nou? {' '}
                        <Link className="lnk" to={`/register?redirect=${redirect}`}>Creare cont</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}