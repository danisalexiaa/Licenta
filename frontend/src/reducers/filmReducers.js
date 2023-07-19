import {FILM_CREATE_FAIL, FILM_CREATE_REQUEST, FILM_CREATE_RESET, FILM_CREATE_SUCCESS, FILM_DELETE_FAIL, FILM_DELETE_REQUEST, FILM_DELETE_RESET, FILM_DELETE_SUCCESS, FILM_DETAILS_FAIL, FILM_DETAILS_REQUEST, FILM_DETAILS_SUCCESS, FILM_GENRE_LIST_FAIL, FILM_GENRE_LIST_REQUEST, FILM_GENRE_LIST_SUCCESS, FILM_LIST_FAIL, FILM_LIST_REQUEST, FILM_LIST_SUCCESS, FILM_REVIEW_FAIL, FILM_REVIEW_REQUEST, FILM_REVIEW_RESET, FILM_REVIEW_SUCCESS, FILM_UPDATE_FAIL, FILM_UPDATE_REQUEST, FILM_UPDATE_RESET, FILM_UPDATE_SUCCESS } from "../constants/filmConstants";


export const filmListReducer = (state = {loading: true, films: [] }, action)=>{
    switch(action.type){
        case FILM_LIST_REQUEST:
            return {loading: true};
        case FILM_LIST_SUCCESS:
            return {loading: false, films: action.payload};
        case FILM_LIST_FAIL:
            return {loading: false, error:action.payload};
        default:
            return state;
    }
};

export const filmGenreListReducer = (state = {loading: true, films: [] }, action)=>{
    switch(action.type){
        case FILM_GENRE_LIST_REQUEST:
            return {loading: true};
        case FILM_GENRE_LIST_SUCCESS:
            return {loading: false, genres: action.payload};
        case FILM_GENRE_LIST_FAIL:
            return {loading: false, error:action.payload};
        default:
            return state;
    }
};

export const filmDetailsReducer = (state = { loading: true}, action) =>{
    switch(action.type){
        case FILM_DETAILS_REQUEST:
            return {loading: true};
        case FILM_DETAILS_SUCCESS:
            return {loading: false, film: action.payload};
        case FILM_DETAILS_FAIL:
            return {loading: false, error: action.apyload};
        default:
            return state;
    }
};

export const filmCreateReducer = (state={}, action) => {
    switch(action.type){
        case FILM_CREATE_REQUEST:
            return {loading: true};
        case FILM_CREATE_SUCCESS:
            return {loading: false, success: true, film: action.payload};
        case FILM_CREATE_FAIL:
            return {loading: false, error: action.payload};
        case FILM_CREATE_RESET:
            return {};
        default:
            return state;
    }
}



export const filmUpdateReducer = (state ={}, action) => {
    switch(action.type){
        case FILM_UPDATE_REQUEST:
            return {loading: true};
        case FILM_UPDATE_SUCCESS:
            return {loading: false, success: true};
        case FILM_UPDATE_FAIL:
            return {loading: false, error: action.payload};
        case FILM_UPDATE_RESET:
            return {}
        default:
            return state;
    }
}

export const filmDeleteReducer = (state={}, action ) => {
    switch(action.type){
        case FILM_DELETE_REQUEST:
            return {loading: true};
        case FILM_DELETE_SUCCESS:
            return {loading: false, success: true};
        case FILM_DELETE_FAIL:
            return {loading: false, error: action.payload};
        case FILM_DELETE_RESET:
            return {}
        default:
            return state;
    }
}

export const filmReviewCreateReducer = (state={}, action) => {
    switch(action.type){
        case FILM_REVIEW_REQUEST:
            return {loading: true};
        case FILM_REVIEW_SUCCESS:
            return {loading: false, success: true, review: action.payload};
        case FILM_REVIEW_FAIL:
            return {loading: false, error: action.payload};
        case FILM_REVIEW_RESET:
            return {};
        default:
            return state;
    }
}