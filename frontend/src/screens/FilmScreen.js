import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import Rating from '../components/Rating'
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { createReview, detailsFilm} from '../actions/filmActions';
import { FILM_REVIEW_RESET } from '../constants/filmConstants';

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [day, month, year].join('-');
}

function formatHour(date){
    var d = new Date(date),
        hours = '' + d.getHours(),
        minutes = '' + d.getMinutes();

    if (hours.length < 2)
        hours = '0' + hours;
    if (minutes.length < 2)
        minutes = '0' + minutes;
    return [hours, minutes].join(':');
}

export default function FilmScreen(props){
    const navigate = useNavigate();

    const {id} = useParams();
    const dispatch = useDispatch();
    const filmId = id;
    const [nr, setNr] = useState(1);
    
    const filmDetails = useSelector((state) => state.filmDetails);
    const { loading, error, film} = filmDetails;

    const userSignIn = useSelector((state) => state.userSignIn);
    const { userInfo} = userSignIn;

    const filmReviewCreate = useSelector((state) => state.filmReviewCreate);
    const { loading: loadingReviewCreate, error: errorReviewCreate, success: successReviewCreate} = filmReviewCreate;

    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
 
    
    useEffect(()=>{
        if(successReviewCreate){
            window.alert('Recenzia a fost trimisa.');
            setRating('');
            setComment('');
            dispatch({type: FILM_REVIEW_RESET});
        }
        dispatch(detailsFilm(filmId));
    }, [dispatch, filmId, successReviewCreate]);

    const addToCartHandler = () =>{
        navigate(`/cart/${filmId}?nr=${nr}`);
    }

    const submitHandler =(e) => {
        e.preventDefault();
        if(comment && rating) {
            dispatch(createReview(filmId, {
                rating, comment, name: userInfo.name
            }))
        }else{
            alert("Nu ati selectat o nota/introdus comentariul.")
        }
    }
    return(
        <div>
        {loading? (
        <LoadingBox></LoadingBox>
        ) : error? (
        <MessageBox variant="danger" >{error}</MessageBox>
        ) : (
            <div>
            <Link className='back' to="/">Inapoi</Link>
            <div className="row top">
                <div className="col-2">
                    <img className='large secondscreen' src={film.image} alt={film.name}></img>
                </div>
                <div className="col-1">
                    <ul>
                        <li>
                        <h1>{film.name}</h1>
                        </li>
                        <li className='rating'>
                            <Rating rating={film.rating} 
                            numReviews={film.numReviews}/>
                        </li>
                        <li>
                            An: {film.an}
                        </li>
                        <li className='descriere'>
                            Descriere: <p>{film.description}</p>
                        </li>
                        <li>
                            Data: {formatDate(film.date) + " " + formatHour(film.date)}
                        </li>
                        <li>
                            Sala: {film.room}
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className='detalii'>
                        <ul>
                            <li>
                                <div className='row'>
                                    <div>Preț</div>
                                    <div className="price" >{film.price} RON</div>
                                </div>
                            </li>
                            <li>
                            <div className='row'>
                                    <div>Status</div>
                                    <div>{film.countInStock>0? <span className='succes'>Filmul este disponibil </span>:
                                    <span className='danger'>Nu este disponibil</span>
                                    }</div>
                                </div>
                            </li>
                            {
                            film.countInStock>0 &&(
                                <>
                                <li>
                                    <div className='row'>
                                        <div>Bilete</div>
                                        <div>
                                            <select
                                             value={nr} 
                                             onChange={(e)=>setNr(e.target.value)}
                                             >
                                                {[...Array(film.countInStock).keys()].map( 
                                                    (x)=> (
                                                        <option key={x+1} value={x+1}>{x+1}</option>
                                                    )
                                                    )}
                                            </select>
                                        </div>
                                    </div>
                                </li>
                                 <li>
                                <button onClick={addToCartHandler} className='primary block'>Rezervă loc</button>
                            </li>
                            </>
                               
                            )}                         
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <h2 id="review">Recenzii</h2>
                {film.reviews.length === 0 && <MessageBox>Nu exista recenzii disponibile</MessageBox>}

                <ul>
                    {film.reviews.map((review) => (
                        <li key={review._id}>
                            <strong>{review.name}</strong>
                            <Rating rating={review.rating} caption = " " ></Rating>
                            <p>
                                {review.createdAt.substring(0, 10)}
                            </p>
                            <p>
                                {review.comment}
                            </p>
                        </li>
                    ))}
                    <li>
                        {userInfo ? (
                            <form className='form' onSubmit={submitHandler}>
                                <div>
                                    <h2>Scrie o recenzie</h2>
                                </div>
                                <div>
                                    <label htmlFor='rating'>Rating</label>
                                    <select id="rating" value = {rating} onChange={(e) => setRating(e.target.value)}>
                                        <option value="">Selectati</option>
                                        <option value = "1">1 - Bloody Disastruous!</option>
                                        <option value = "2">2 - Ghastly</option>
                                        <option value = "3">3 - Mediocre</option>
                                        <option value = "4">4 - Almost Scared</option>
                                        <option value = "5">5 - Real Horrorshow!</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor='comment'>Comentariu</label>
                                    <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)}></textarea>
                                </div>
                                <div>
                                    <label>
                                    <button className='primary' tpe="submit">Trmite recenzia</button>
                                    </label>
                                </div>
                                <div>
                                {loadingReviewCreate && (<LoadingBox></LoadingBox>)}
                                {errorReviewCreate && <MessageBox variant="danger">{errorReviewCreate}</MessageBox>}

                                </div>
                            </form>
                        ): (
                            <MessageBox> Nu sunteti autentificat. Pentru a putea trimite o recenzie, va rugam sa va <Link to="/signin">logati in contul dumneavoastra.</Link></MessageBox>
                        )}
                    </li>
                </ul>
                </div>
        </div>
        )}
     </div> 
    );
}
