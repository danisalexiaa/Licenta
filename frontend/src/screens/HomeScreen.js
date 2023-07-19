import React, { useEffect } from 'react';
import Film from '../components/Film'
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listFilms } from '../actions/filmActions';

export default function HomeScreen(){
  const dispatch = useDispatch();
 const filmList = useSelector(state =>state.filmList);
 const {loading, error, films} = filmList;
  useEffect(()=>{
    dispatch(listFilms({}));
  }, [dispatch]);
      return(
        <div>
          {loading? (
          <LoadingBox></LoadingBox>
          ) : error? (
          <MessageBox variant="danger" >{error}</MessageBox>
          ) : (
            <div className="row center">
          {films.map((film) => (
              <Film className='home' key = {film._id}  film = {film}></Film>
            ))}            
          </div>
          )} 
       </div>
    );
}