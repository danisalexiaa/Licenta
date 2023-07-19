import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useNavigate } from 'react-router-dom';
import { listOrderMine } from '../actions/orderActions';

export default function OrderHistoryScreen() {
    const orderMineList = useSelector(state=>state.orderMineList);
    const {loading, error, orders} = orderMineList;
    // eslint-disable-next-line no-undef
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(()=>{
        // eslint-disable-next-line no-undef
        dispatch(listOrderMine());
    }, [dispatch]);
  return (
    <div>
        <h1>Istoric Comenzi</h1> 
        { loading ? (
        <LoadingBox></LoadingBox>
        ) : error? ( <MessageBox variant = "danger">{error}</MessageBox>
        ) : (
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
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
                            <td>{order.createdAt.substring(0, 10)}</td>
                            <td>{order.totalPrice.toFixed(2)}</td>
                            <td>{order.isPaid? order.paidAt.substring(0, 10): 'Neplatita'}</td>
                            <td>{order.isDelivered? order.deliveredAt.substring(0, 10): 'Nelivrata'}</td>
                            <td>
                                <button type="button" className='small' 
                                onClick={()=>{navigate(`/order/${order._id}`)}}>Detalii</button>
                            </td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        )}
    </div>
  )
}
