import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
    name: { type: String, required: true},
    comment: { type: String, required: true},
    rating: {type: Number, required: true},
},
{
    timestamps: true,
});

const filmSchema = new mongoose.Schema({
    image: { type: String, required: true},
    name: { type: String, required: true, unique: true},
    genre: { type: String, required: true},

    price: {type: Number, required: true},
    countInStock: { type: Number, required: true},
    rating: { type: Number, required: true},
    numReviews: { type: Number, required: true},
    description: { type: String, required: true},
    an: { type: String, required: true},
    reviews: [reviewSchema],
    date: {type: Date, required: true},
    room: {type: String, required: true},
}, {
    timestamps: true,
});

const Film = mongoose.model('Film', filmSchema);

export default Film;