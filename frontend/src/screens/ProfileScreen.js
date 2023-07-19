import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstant';

export default function ProfileScreen() 
{
    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const userSignIn = useSelector((state) => state.userSignIn);
    const {userInfo} = userSignIn;

    const userDetails = useSelector((state) => state.userDetails);
    const { loading, error, user} = userDetails;
    const userUpdateProfile = useSelector(state => state.userUpdateProfile);
    const {success: successUpdate, error: errorUpdate, loading: loadingUpdate} = userUpdateProfile;
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!user){
            dispatch({type: USER_UPDATE_PROFILE_RESET})
            dispatch(detailsUser(userInfo._id));
        }
        else{
            setName(user.name);
            setMail(user.email);
        }
    }, [dispatch, userInfo._id, user]);

    const submitHandler = (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            alert('Password and confirm not matching!')
        }
        else{
            dispatch(updateUserProfile({userId: user._id, name, mail, password}));
        }
    }
  return (
    <div>
        <form className='form' onSubmit={submitHandler}>
            <div> <h1>Profil</h1></div>
            {loading  ? (
            <LoadingBox></LoadingBox>
            ) : error ? ( <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && (<MessageBox variant="danger">{errorUpdate}</MessageBox>)}
                {successUpdate && <MessageBox variant="success">
                    Profilul a fost actualizat cu succes!</MessageBox>}
                  <div>
                      <label htmlFor='name'>Nume</label>
                      <input 
                      id="name" type="text" placeholder='Introduceti numele' value={name} onChange={(e) => setName(e.target.value)}>
                      </input>
                  </div>
                  <div>
                      <label htmlFor='email'>Email</label>
                      <input 
                      id="email" type="email" placeholder='Introduceti email-ul' value={mail} onChange={(e) => setMail(e.target.value)}>
                      </input>
                  </div>
                  <div>
                      <label htmlFor='password'>Parola</label>
                      <input 
                      id="password" type="password" placeholder='Introduceti parola' onChange={(e) => setPassword(e.target.value)}>
                      </input>
                  </div>
                  <div>
                      <label htmlFor='confirmPassword'>Confirma parola</label>
                      <input 
                      id="confirmPassword" type="password" placeholder='Confirma parola' onChange={(e) => setConfirmPassword(e.target.value)}>
                      </input>
                  </div>
                  <div>
                      <label/>
                      <button className='primary' type='submit'>Update</button>
                  </div>
                </>
             )}
        </form>
    </div>
  );
}
