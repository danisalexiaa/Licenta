import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser, listUsers } from '../actions/userActions';
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { USER_DETAILS_REQUEST, USER_DETAILS_RESET } from '../constants/userConstant';


export default function UserListScreen() {
    const userList = useSelector((state) =>state.userList);
    const {loading, error, users} = userList;
    const navigate = useNavigate();
    const userDelete = useSelector((state) =>state.userList);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = userDelete;
        
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(listUsers());
        dispatch({
            type: USER_DETAILS_RESET
        });
    }, [dispatch, successDelete]);

    const deleteHandler = (user) => {
        if(window.confirm('Stergeti userul?')){
            dispatch(deleteUser(user._id));
        }
    }
  return (
    <div>
        <h1>Utilizatori</h1>
        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        {successDelete && <MessageBox variant="success">User sters</MessageBox>}
        {
            loading? ( <LoadingBox></LoadingBox>)
            : 
            error? (<MessageBox variant="danger">{error}</MessageBox>)
            :
            (
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NUME</th>
                            <th>EMAIL</th>
                            <th>FURNIZOR</th>
                            <th>ADMINISTRATOR</th>
                            <th>DETALII</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user)=>(
                                <tr key={user._id}>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isSeller? 'DA': 'NU'}</td>
                                    <td>{user.isAdmin? 'DA': 'NU'}</td>
                                    <td>
                                        <button type='button' className='small' onClick={() => navigate(`/user/${user._id}/edit`)}>Editare</button>
                                        <button type="button" className='small' onClick={()=>deleteHandler(user)}>Sterge</button>
                                    </td>
                                   </tr>
                            ))
                        }
                    </tbody>
                </table>
            )
        }
    </div>
  );
}
