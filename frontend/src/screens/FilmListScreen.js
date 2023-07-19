import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {createFilm, deleteFilm, listFilms} from '../actions/filmActions';
import {useNavigate} from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { FILM_CREATE_RESET, FILM_DELETE_RESET } from '../constants/filmConstants';

export default function FilmListScreen() {
    const filmList = useSelector((state) => state.filmList);
    const {loading, error, films } = filmList;

    const filmCreate = useSelector((state) => state.filmCreate);
    const {loading: loadingCreate, error: errorCreate, success: successCreate, film: createdFilm} = filmCreate;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const filmDelete = useSelector ((state) => state.filmDelete);
    const {loading: loadingDelete, error: errorDelete, success: successDelete} = filmDelete;

    useEffect(()=>{
        if(successCreate){
            dispatch({type:FILM_CREATE_RESET});
            navigate(`/film/${createdFilm._id}/edit`);
        }
        if(successDelete){
            dispatch({type: FILM_DELETE_RESET});
        }
        dispatch(listFilms({}));
    }, [createdFilm, dispatch, navigate, successCreate, successDelete]);

   
    const deleteHandler = (film) => {
        if (window.confirm('Stergeti filmul?')) {
        dispatch(deleteFilm(film._id));
        }
    }

    const createHandler = () => {
        dispatch(createFilm());
    }
  return (
    <div>
        
        <h1>Filme</h1>
        <div className='row'>
        <button type="button" className='primary' onClick={createHandler}>Adauga film</button>
        </div>

        <br/>

        {loadingDelete && <LoadingBox></LoadingBox>}
        {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
        

        {loadingCreate && <LoadingBox></LoadingBox>}
        {errorCreate && <MessageBox variant="danger">{errorCreate}</MessageBox>}

        

        {
            loading? <LoadingBox></LoadingBox>
            :
            error ? <MessageBox variant="danger">{error}</MessageBox>
            :
            <table className='table'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NUME</th>
                        <th> AN </th>
                        <th>GEN</th>
                        <th>PRET</th>
                        <th>DATA</th>
                        <th>SALA</th>
                        {/* <th>DESCRIERE</th> */}
                        <th>DETALII</th>
                    </tr>
                </thead>
                <tbody>
                    {films.map((film) => (
                        <tr key={film._id}>
                            <td>{film._id}</td>
                            <td>{film.name}</td>
                            <td>{film.an}</td>
                            <td>{film.genre}</td>
                            <td>{film.price}</td>
                            <td>{film.date}</td>
                            <td>{film.room}</td>
                             
                            <td>
                                <button type="button" className='small'
                                onClick={()=>{navigate(`/film/${film._id}/edit`)}}>Editare</button>

                                <button type="button" className='small'
                                onClick={() => deleteHandler(film)}>Sterge filmul</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        }
    </div>
  )
}
