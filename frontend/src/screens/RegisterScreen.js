import React, { useEffect, useState } from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import { useDispatch, useSelector} from 'react-redux'
import { register, signin } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

export default function RegisterScreen(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // eslint-disable-next-line no-undef
    const search = useLocation();
    const navigate = useNavigate();
    const redirectInUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectInUrl ? redirectInUrl : '/shipping';

    const userRegister = useSelector((state)=> state.userRegister);
    const {userInfo, loading, error} = userRegister;

    const dispatch = useDispatch();

    const submitHandler = (e) =>{
        e.preventDefault();
        if(password !==confirmPassword){
            alert("Password and confirm password are not matching");

        }else{
            // eslint-disable-next-line no-undef
        dispatch(register(name, email, password));
        }
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
                <h1>Creare cont</h1>
                </div>

                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant='danger'>{error}</MessageBox>}
                <div>
                    <label htmlFor='name'>Nume</label>
                    <input className='nume' type='nume' id='nume' placeholder='Introduceți numele' required onChange={ e=> setName(e.target.value)}></input>
                </div>
                <div>
                    <label htmlFor='email'>Adresă de mail</label>
                    <input className='mail' type='email' id='email' placeholder='Introduceți adresa de mail' required onChange={ e=> setEmail(e.target.value)}></input>
                </div>

                <div>
                    <label htmlFor='password'>Parolă</label>
                    <input className='pass' type='password' id='password' placeholder='Introduceți parola' required onChange={ e=> setPassword(e.target.value)}></input>
                </div>

                <div>
                    <label htmlFor='confirmPassword'>Confirmare parolă</label>
                    <input className='pass' type='password' id='confirmPassword' placeholder='Confirmați parola' required onChange={ e=> setConfirmPassword(e.target.value)}></input>
                </div>

                <div>
                    <label />
                    <button className='primary' type='submit'>Creeaza cont</button>
                </div>
                <div>
                    <label />
                    <div>
                        Client existent?  {' '}
                        <Link className="lnk" to={`/signin?redirect=${redirect}`}>Logare</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}