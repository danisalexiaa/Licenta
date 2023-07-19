import  Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { detailsFilm, updateFilm } from '../actions/filmActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { FILM_UPDATE_RESET } from '../constants/filmConstants';

export default function FilmEditScreen() {
    const navigate = useNavigate();

    const params = useParams();
    const {id: filmId} = params;

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [genre, setGenre] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [an, setAn] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [room, setRoom] = useState('');

    const filmDetails = useSelector((state) => state.filmDetails);
    const {loading, error, film} = filmDetails;

    const filmUpdate = useSelector((state) => state.filmUpdate);
    const {loading: loadingUpdate, error: errorUpdate, success: successUpdate} = filmUpdate;

    const dispatch = useDispatch();
    useEffect(()=>{
            if(successUpdate) {
                 navigate('/filmlist');
                }

        if(!film || film._id !== filmId || successUpdate){
            dispatch({type: FILM_UPDATE_RESET});
            dispatch(detailsFilm(filmId));
        }
        else{
            setName(film.name);
            setGenre(film.genre);
            setImage(film.image); 
            setPrice(film.price);
            setCountInStock(film.countInStock);
            setDescription(film.description);
            setAn(film.an);
            setDate(film.date);
            setRoom(film.room);
        }
    }, [film, dispatch, filmId, successUpdate, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(updateFilm({_id: filmId,
        name, price, image, genre, countInStock, description, an, date, room}));
    };



    const [loadingUpload, setLoadingUpload] = useState(false);
    const [errorUpload, setErrorUpload] = useState('');

    const userSignIn = useSelector((state)=>state.userSignIn);
    const {userInfo} = userSignIn;
    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const bodyFormData = new FormData();
        bodyFormData.append('image', file);
        setLoadingUpload(true);
        try{
                const {data} = await Axios.post('/api/uploads', bodyFormData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            });
            setImage(data);
            setLoadingUpload(false);
        }catch(error){
            setErrorUpload(error.message);
            setLoadingUpload(false);
        }
    }

  return (
    <div>
        <form className='form' onSubmit={submitHandler}>
            <div>
                <h1>Editeaza film {filmId} </h1>
            
            </div>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && <MessageBox variant="danger">{errorUpdate}</MessageBox>}

            {loading ? <LoadingBox></LoadingBox>:
            error? <MessageBox variant="danger">{error}</MessageBox>
            :
            <>
            <div>
                <label htmlFor='name'>Nume</label>
                <input id="name" type="text" placeholder="Introduceti numele" value={name} onChange={(e) => setName(e.target.value)}></input>
            </div>

            <div>
                <label htmlFor='price'>Pret</label>
                <input id="price" type="text" placeholder="Introduceti pretul" value={price} onChange={(e) => setPrice(e.target.value)}></input>
            </div>

            <div>
                <label htmlFor='image'>Imagine</label>
                <input id="image" type="text" placeholder="Introduceti imaginea" value={image} onChange={(e) => setImage(e.target.value)}></input>
            </div>

            <div>
                <label htmlFor='imageFile'>Image File</label>
                <input type='file' id='imageFile' label='Choose Image'
                onChange={uploadFileHandler}></input>

                {loadingUpload && <LoadingBox></LoadingBox>}
                {errorUpload && (<MessageBox variant="danger">{errorUpload}</MessageBox>)}
            </div>

            <div>
                <label htmlFor='genre'>Gen</label>
                <input id="genre" type="text" placeholder="Introduceti genul" value={genre} onChange={(e) => setGenre(e.target.value)}></input>
            </div>

            <div>
                <label htmlFor='countInStock'>Numar Bilete</label>
                <input id="cuntInStock" type="text" placeholder="Introduceti numarul de bilete" value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></input>
            </div>

            <div>
                <label htmlFor='an'>An Aparitie</label>
                <input id="an" type="text" placeholder="Introduceti anul aparitiei" value={an} onChange={(e) => setAn(e.target.value)}></input>
            </div>

            <div>
                <label htmlFor='description'>Descriere</label>
                <textarea id="description" rows="3" type="text" placeholder="Introduceti descrierea" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>

            <div>
                <label htmlFor='date'>Data</label>
                <input id="date" type="text" placeholder="Introduceti data" value={date} onChange={(e) => setDate(e.target.value)}></input>
            </div>

            <div>
                <label htmlFor='room'>Sala</label>
                <input id="room" type="text" placeholder="Introduceti sala" value={room} onChange={(e) => setRoom(e.target.value)}></input>
            </div>

            <div>
                <label></label>
                <button className='primary' type="submit">Editeaza</button>
            </div>
            </>
        }
        </form>
    </div>
  )
}
