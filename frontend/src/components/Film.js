import React from 'react'
import { Link } from 'react-router-dom';
import Rating from './Rating';

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

export default function Film(props){
    const {film} = props;
    return (
        <div key={film.id} className="card">
                <Link to={`/film/${film._id}`}>
                    <img className="medium" src={film.image} alt={film.name}/>
                </Link>
                <div className="card-body" >
                  <Link to={`/film/${film._id}`}>
                        <h2 className='title' >{film.name}</h2>
                    </Link>
                    <p>{formatHour(film.date)}</p>
                    <p>{formatDate(film.date)}</p>
                    <Rating rating={film.rating} numReviews={film.numReviews}>
                    </Rating>
                    <div className='price'>{film.price} RON</div>
                 </div>
              </div>
    );
}