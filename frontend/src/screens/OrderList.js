import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_FAIL, ORDER_DELETE_RESET } from '../constants/orderConstants';

export default function OrderList() {
    
    const orderList = useSelector((state) => state.orderList);
    const navigate = useNavigate();
    const {loading, error, orders} = orderList;
    const orderDelete = useSelector((state) => state.orderDelete);
    const {loading: loadingDelete, success: successDelete, error: errorDelete} = orderDelete;
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: ORDER_DELETE_RESET});
        dispatch(listOrders());
    }, [dispatch, successDelete])

    const deleteHandler = (order) => {
        if(window.confirm('Stergeti comanda?')){
            dispatch(deleteOrder(order._id));
        }
    }
  return (
    <div>
        <div>
            <h1>Comenzi</h1> 
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            { loading ? (
            <LoadingBox></LoadingBox>
            ) : error? ( <MessageBox variant = "danger">{error}</MessageBox>
            ) : (
                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATA</th>
                            <th>TOTAL</th>
                            <th>PLATITA</th>
                            <th>LIVRATA</th>
                            <th>ACTIUNI</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                <td>{order.user.name}</td>
                                <td>{order.createdAt.substring(0, 10)}</td>
                                <td>{order.totalPrice.toFixed(2)}</td>
                                <td>{order.isPaid? order.paidAt.substring(0, 10): 'Neplatita'}</td>
                                <td>{order.isDelivered? order.deliveredAt.substring(0, 10): 'Nelivrata'}</td>
                                <td>
                                    <button type="button" className='small' 
                                    onClick={()=>{navigate(`/order/${order._id}`)}}>Detalii</button>

                                    <button type="button" className='small' onClick={()=>deleteHandler(order)}>Sterge comanda</button>
                                </td>
                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
      </div>
  );
}
