const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const MovieType = {
    title: String,
    coverPicture: String,
    movieType:String,
}
const MovieModel = mongoose.model("movies", new mongoose.Schema(MovieType))

router.get('/get', (req, res) => {
    MovieModel.find().then(data => {
        res.send(data)
    })
})

module.exports = router;