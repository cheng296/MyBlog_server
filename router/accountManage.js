const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const JWT = require('../modules/JWT')

const UserType = {
    username: String,
    password: String,
    gender: String
}
const UserModel = mongoose.model("users", new mongoose.Schema(UserType))

router.post('/login', (req, res) => {
    const { username, password } = req.body
    UserModel.find({ username, password }).then(data => {
        if (data.length === 0) {
            res.send({ ok: 0 })
        } else {
            const token = JWT.generate({ username }, '1h')
            res.header('Access-Control-Expose-Headers', 'Authorization')
            res.header("Authorization", token)
            res.send({ ok: 1 })
        }
    })
})

router.post('/register', (req, res) => {
    const { username, password, gender } = req.body
    UserModel.find({ username }).then(data => {
        if (data.length === 0) {
            UserModel.create({
                username, password, gender
            })
            res.send({ ok: 1 })
        } else {
            res.send({ ok: 0 })
        }
    })

})

//验证token
router.get('/verify', (req, res) => {
    const token = req.headers['authorization']?.split(" ")[1]
    if (token) {
        const payload = JWT.verify(token)
        if (payload) {
            const newToken = JWT.generate({
                username: payload.username
            }, "1d")
            res.header('Access-Control-Expose-Headers', 'Authorization')
            res.header("Authorization", newToken)
            res.send({ ok: 1 })
        } else {
            res.send({ ok: 0 })
        }
    } else {
        res.send({ ok: 0 })
    }
})

module.exports = router;