const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const MovieType = {
    movieReferrer: String,
    title: String,
    coverPicture: String,
    movieType: String,
}
const MovieModel = mongoose.model("movies", new mongoose.Schema(MovieType))

router.get('/get', (req, res) => {
    MovieModel.find().then(data => {
        res.send(data)
    })
})

router.post('/create', (req, res) => {
    const { movieReferrer, title, coverPicture, movieType } = req.body;
    MovieModel.find({ title }).then(data => {
        if (data.length !== 0) {
            res.send({ ok: 0, message: "该电影已存在！" })
            return new Promise((res, rej) => { })
        } else {
            return MovieModel.create({ movieReferrer, title, coverPicture, movieType })
        }
    }).then(data => {
        res.send({ ok: 1 })
    }
    ).catch(err => res.send({ ok: 0 }))
})

module.exports = router;