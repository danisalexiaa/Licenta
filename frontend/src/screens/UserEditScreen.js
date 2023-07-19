import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { detailsUser, updateUser } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_UPDATE_RESET } from '../constants/userConstant';

export default function UserEditScreen() {
    const navigate = useNavigate();
    const params = useParams();
    const {id: userId} = params; 

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();
    const userDetails = useSelector((state)=>state.userDetails);
    const {loading, error, user } = userDetails;

    const userUpdate = useSelector((state)=>state.userUpdate);
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

    useEffect(()=>{
        if(successUpdate){
            dispatch({type: USER_UPDATE_RESET});
            navigate('/userlist');
        }
        if(!user){
            dispatch(detailsUser(userId));
        }else{
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }
    }, [dispatch, navigate, successUpdate, user, userId]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateUser({_id:userId,
        name, email, isAdmin}))
    }
  return (
      <div>
          <form className='form' onSubmit={submitHandler}>
              <div>
                  <h1>Editeaza userul {name}</h1>
                  {loadingUpdate && <LoadingBox></LoadingBox>}
                  {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}
              </div>
              {loading ? <LoadingBox/> :
              error ? <MessageBox variant="danger">{error}</MessageBox>
            : 
            <>
            <div>
                <label htmlFor='name'>Nume</label>
                <input id="name" type="text" placeholder='Introduceti numele' value={name} onChange={(e) => setName(e.target.value)}/>
            </div>
            <div>
                <label htmlFor='email'>Email</label>
                <input id="email" type="text" placeholder='Introduceti emailul' value={email} onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div>
                <label htmlFor='isAdmin'>Admin</label>
                <input id="isAdmin" type="checkbox" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
            </div>
            <div>
                <button type="submit" className='primary'>
                    Update
                </button>
            </div>
            </>
            }
          </form>
      </div>
  );
}