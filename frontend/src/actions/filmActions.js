import Axios from "axios";
import { FILM_GENRE_LIST_FAIL, FILM_GENRE_LIST_REQUEST, FILM_GENRE_LIST_SUCCESS, FILM_CREATE_FAIL, FILM_CREATE_REQUEST, FILM_CREATE_SUCCESS, FILM_DELETE_FAIL, FILM_DELETE_REQUEST, FILM_DELETE_SUCCESS, FILM_DETAILS_FAIL, FILM_DETAILS_REQUEST, FILM_DETAILS_SUCCESS, FILM_LIST_FAIL, FILM_LIST_REQUEST, FILM_LIST_SUCCESS, FILM_UPDATE_FAIL, FILM_UPDATE_REQUEST, FILM_UPDATE_SUCCESS, FILM_REVIEW_REQUEST, FILM_REVIEW_SUCCESS, FILM_REVIEW_FAIL } from "../constants/filmConstants"

export const listFilms = ({name = '', genre="", min = 0, max = 0, rating = 0, order = ''} ) => async (dispatch) =>{
    dispatch({
        type: FILM_LIST_REQUEST
    });
    try{
        const { data } = await Axios.get(
            `/api/films?name=${name}&genre=${genre}&min=${min}&max=${max}&rating=${rating}&order=${order}`);
        dispatch({type: FILM_LIST_SUCCESS, payload: data});
    }catch(error){
        dispatch({type: FILM_LIST_FAIL, payload: error.message})
    }
};

export const listFilmGenres = () => async (dispatch) =>{
    dispatch({
        type: FILM_GENRE_LIST_REQUEST
    });
    try{
        const { data } = await Axios.get(`/api/films/genres`);
        dispatch({type: FILM_GENRE_LIST_SUCCESS, payload: data});
    }catch(error){
        dispatch({type: FILM_GENRE_LIST_FAIL, payload: error.message})
    }
};

export const detailsFilm = (filmId) => async(dispatch)=>{
    dispatch({type: FILM_DETAILS_REQUEST, payload: filmId});
    try{
        const {data} = await Axios.get(`/api/films/${filmId}`);
        dispatch({type: FILM_DETAILS_SUCCESS, payload: data});
    }catch(error){
        dispatch({type: FILM_DETAILS_FAIL, payload: error.response && error.response.data.message ?
        error.response.data.message : error.message});
    }
}

export const createFilm = () => async(dispatch, getState) => {
    dispatch({type: FILM_CREATE_REQUEST});
    const {userSignIn:{userInfo}} = getState();
    try{
        const {data} = await Axios.post('/api/films', {}, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({
            type: FILM_CREATE_SUCCESS,
            payload: data.film,
        });
    }catch(error){
        const message = error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        dispatch({type: FILM_CREATE_FAIL, payload: message})
    }
}

export const updateFilm = (film) => async (dispatch, getState) => {
    dispatch(
        {type: FILM_UPDATE_REQUEST, payload: film}
    );

    const {userSignIn:{userInfo}} = getState();
    try{
        const {data} = await Axios.put(`/api/films/${film._id}`, film, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({type: FILM_UPDATE_SUCCESS, payload: data});

    }catch(error){
        const message = error.response&&error.response.data.message
        ? error.response.data.message
        : error.message;
        dispatch({type: FILM_UPDATE_FAIL, error: message})
    }
}

export const deleteFilm = (filmId) => async(dispatch, getState) => {
    dispatch({type: FILM_DELETE_REQUEST, payload: filmId})
    const {userSignIn: {userInfo}} = getState();
    try{
        const {data } = await Axios.delete(`/api/films/${filmId}`, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
      
        });

        dispatch({type: FILM_DELETE_SUCCESS})
    }catch(error){
        const message = error.response&&error.response.data.message
        ? error.response.data.message
        : error.message;
        dispatch({type: FILM_DELETE_FAIL, payload: message})
   
    }
}

export const createReview = (filmId, review) => async(dispatch, getState) => {
    dispatch({type: FILM_REVIEW_REQUEST});
    const {userSignIn:{userInfo}} = getState();
    try{
        const {data} = await Axios.post(`/api/films/${filmId}/reviews`, review, {
            headers: {Authorization: `Bearer ${userInfo.token}`},
        });
        dispatch({
            type: FILM_REVIEW_SUCCESS,
            payload: data.review,
        });
    }catch(error){
        const message = error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        dispatch({type: FILM_REVIEW_FAIL, payload: message})
    }
}