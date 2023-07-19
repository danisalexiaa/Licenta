import express from 'express'
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Film from '../models/filmModel.js';
import { isAuth, isAdmin} from '../utils.js';

const filmRouter = express.Router();

filmRouter.get('/', expressAsyncHandler(async(req, res) =>{
    const name = req.query.name || '';
    const genre = req.query.genre || '';
    const order = req.query.order || '';
    const min = req.query.min && Number(req.query.min) !==0? Number(req.query.min) : 0;
    const max = req.query.max && Number(req.query.max) !==0? Number(req.query.max) : 0;
    const rating = req.query.rating && Number(req.query.rating) !==0? Number(req.query.rating) : 0;
    
    const nameFilter = name ? {name: {$regex: name, $options: 'i'}} : {};
    const genreFilter = genre ? {genre} : {};
    const priceFilter = min && max ? {price: {$gte: min, $lte: max}} :{};
    const ratingFilter = rating ? {rating: {$gte: rating}} :{};
    const sortOrder = order === 'lowest' ? {price: 1}:
    order === 'highest' ? {price: -1}:
    order === 'rated' ? {rating: -1}:
    {_id: 1};
    const films = await Film.find({...nameFilter, ...genreFilter, ...priceFilter, ...ratingFilter})
    .sort(sortOrder);
    res.send(films);
}));

filmRouter.get('/genres', expressAsyncHandler(async(req, res) => {
    const genres = await Film.find().distinct('genre');
    res.send(genres);
}));

filmRouter.get('/seed', expressAsyncHandler(async (req, res)=>{
     await Film.remove({});
    const createdFilms = await Film.insertMany(data.films)
    res.send({createdFilms});
}));

filmRouter.get('/:id', expressAsyncHandler(async(req, res)=>{
    const film = await Film.findById(req.params.id);
    if(film){
        res.send(film);
    }
    else{
        res.status(404).send({message: "Film not found"});
    }
}));

filmRouter.post('/', 
isAuth, 
isAdmin,
 expressAsyncHandler(async(req, res) =>{
    const film = new Film({
        name: 'sample name' + Date.now(),
        genre: 'sample genre',
        image:'/images/film1.jpg',
        price: 0,
        an: 0,
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description: 'n/a',
        date: Date.now(),
        room: 'A0',
    });
    const createdFilm = await film.save();
    res.send({message: 'Film creat!', film: createdFilm});
}));


filmRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    const filmId = req.params.id;
    const film = await Film.findById(filmId);
    if (film) {
        film.name = req.body.name;
        film.price = req.body.price;
        film.image = req.body.image;
        film.genre = req.body.genre;
        film.countInStock = req.body.countInStock;
        film.an = req.body.an;
        film.description = req.body.description;
        film.date = req.body.date;
        film.room = req.body.room;
        const updatedFilm = await film.save();
        res.send({message: 'Film actualizat', film: updatedFilm});

    }else{
        res.status(404).send({message: 'Filmul nu a fost gasit'});
    }
}));

filmRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async(req, res)=> {
    const film = await Film.findById(req.params.id);
    if(film){
        const deletedFilm = await film.remove();
        res.send({message: 'Film Sters', film: deletedFilm});

    }else{
        res.status(404).send({message: 'Film negasit'});
    }
}));

filmRouter.post('/:id/reviews', isAuth, expressAsyncHandler(async(req, res) => {
    const filmId = req.params.id;
    const film = await Film.findById(filmId);
    if (film) {
        if(film.reviews.find((x)=>x.name === req.user.name)){
            return res.status(400).send({message: "Nu se pot trimite mai multe recenzii."});
        }
       const review ={name: req.user.name, rating: Number(req.body.rating), comment: req.body.comment}
       film.reviews.push(review);
       film.numReviews = film.reviews.length;
       film.rating = film.reviews.reduce((a, c) => c.rating + a, 0) / film.reviews.length;
        const updatedFilm = await film.save();
        res.status(201).send({message: 'Recenzie creata', review: updatedFilm.reviews[updatedFilm.reviews.length - 1]});

    }else{
        res.status(404).send({message: 'Filmul nu a fost gasit'});
    }
}));

export default filmRouter;