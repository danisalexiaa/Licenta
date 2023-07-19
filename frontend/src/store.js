
import {applyMiddleware, createStore, compose, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import { cartReducer } from './reducers/cartReducers';
import { filmCreateReducer, filmDeleteReducer, filmDetailsReducer, filmGenreListReducer, filmListReducer, filmReviewCreateReducer, filmUpdateReducer } from "./reducers/filmReducers";
import { orderCreateReducer, orderDeleteReducer, orderDetailsReducer, orderListReducer, orderMineListReducer } from './reducers/orderReducers';
import { userDeatilsReducer, userDeleteReducer, userListReducer, userRegisterReducer, userSignInReducer, userUpdateProfileReducer, userUpdateReducer } from './reducers/userReducer';

const initialState = {
    userSignIn: {
        userInfo: localStorage.getItem('userInfo')? 
        JSON.parse(localStorage.getItem('userInfo')):null
    },
    cart:{
        cartItems: localStorage.getItem('cartItems')?
        JSON.parse( localStorage.getItem('cartItems')):[],
        shippingAddress: localStorage.getItem('shippingAddress')?JSON.parse(localStorage.getItem('shippingAddress')) : {},
        paymentMethod: localStorage.getItem('paymentMethod')?JSON.parse(localStorage.getItem('paymentMethod')) : null
    }
};
const reducer = combineReducers({
    filmList: filmListReducer,
    filmDetails: filmDetailsReducer,
    cart: cartReducer,
    userSignIn: userSignInReducer,
    userRegister: userRegisterReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderMineList: orderMineListReducer,
    userDetails: userDeatilsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userUpdate: userUpdateReducer,
    filmCreate: filmCreateReducer,
    filmUpdate: filmUpdateReducer,
    orderList: orderListReducer,
    filmDelete: filmDeleteReducer,
    orderDelete: orderDeleteReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    filmGenreList: filmGenreListReducer,
    filmReviewCreate: filmReviewCreateReducer,

});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;