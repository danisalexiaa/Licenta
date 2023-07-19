import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { listFilms } from '../actions/filmActions'
import Film from '../components/Film';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
// import { USER_UPDATE_PROFILE_SUCCESS } from '../constants/userConstant';
import { prices, ratings } from '../utils';

export default function SearchScreen() {
    const {name='all', genre = 'all', min=0, max=0, rating = 0, order = 'newest'} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const filmList = useSelector((state) => state.filmList);
    const {loading, error, films} = filmList;

    const filmGenreList = useSelector((state) => state.filmGenreList);
    const {loading: loadingGenres, error: errorGenres, genres} = filmGenreList;

    useEffect(()=>{
        dispatch(listFilms({name: name !== 'all'?name:'',
        genre: genre !== 'all'?genre:'', min, max, rating, order}));
    }, [genre, dispatch, min, max, name, order, rating]);

    const getFilterUrl = (filter) => {
        const filterGenre = filter.genre || genre;
        const filterName = filter.name || name;
        const filterMinimum = filter.min ? filter.min : filter.min === 0? 0: min;
        const filterMax = filter.max ? filter.max : filter.max ===0 ? 0 : max;
        const filterRating = filter.rating || rating;
        const sortOrder = filter.order || order;
        
        return `/search/genre/${filterGenre}/name/${filterName}/min/${filterMinimum}/max/${filterMax}/rating/${filterRating}/order/${sortOrder}`;
    }
  return (
    <div>
        <div className='row1'>
        {loading?(<LoadingBox></LoadingBox>)
        :
        error? (<MessageBox variant="danger">{error}</MessageBox>)
    :
      <div> {films.length} Rezultate </div>
        }
        <div>
            Sorteaza dupa {' '}
            <select value={order}
                 onChange={(e) => {
                navigate(getFilterUrl({order: e.target.value}))
            }}>
                <option value="newest">Noutati</option>
                <option value="lowest">Pret crescator</option>
                <option value="highest">Pret descrescator</option>
                <option value="rated">Rating</option>
           
           
            </select>
        </div>
    </div>
    <div className='row top1'>
        <div className='col-11'>
            <h3>Genuri de filme</h3>
            {loadingGenres?(<LoadingBox></LoadingBox>)
            :
            errorGenres? (<MessageBox variant="danger">{errorGenres}</MessageBox>)
            :
            <ul>
                <li>
                    <Link className={'all' === genre ? 'active' : ''} to={getFilterUrl({genre: 'all'})}>Any</Link>
                </li>
              {genres.map((c)=>(
                  <li key={c}>
                      <Link className={c === genre ? 'active' : ''} to={getFilterUrl({genre: c})}>{c}</Link>
                  </li>
              ))}
            </ul>
            }

           
        </div>
        <div>
            <h3>Pret</h3>
            <ul>
                {prices.map((p)=>(
                    <li key={p.name}>
                        <Link to={getFilterUrl({min: p.min, max: p.max})}
                           className={`${p.min}-${p.max}` === `${min} - ${max}`?'active' : ''} >
                               {p.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>

        <div>
            <h3>Rating</h3>
            <ul>
                {ratings.map((r)=>(
                    <li key={r.name}>
                        <Link to={getFilterUrl({rating: r.rating})}
                           className={`${r.rating}` === `${rating}` ?'active' : ''} >
                               <Rating caption={r.name} rating = {r.rating}/>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
        <div className='col-3'>
        {loading?(<LoadingBox></LoadingBox>)
        :
        error? (<MessageBox variant="danger">{error}</MessageBox>)
    :
    <div>
        <div className="row center">
          {films.map((film) => (
              <Film className='home' key = {film._id}  film = {film}></Film>
            ))}            
          </div>
    </div>
        }
        </div>
    </div>
    </div>
  );
}
