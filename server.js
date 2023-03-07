const express = require('express')
const cors = require("cors")
const mongoose = require('mongoose')
const JWT = require('./JWT')

mongoose.connect("mongodb://127.0.0.1:27017/blog")

const UserType = {
    username: String,
    password: String,
    gender: String
}
const UserModel = mongoose.model("user", new mongoose.Schema(UserType))

const app = express()
app.use(cors())
app.use(express.json())

app.post('/login', (req, res) => {
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
app.post('/register', (req, res) => {
    const { username, password, gender } = req.body
    UserModel.create({
        username, password, gender
    })
    res.send({ ok: 1 })
})
//验证token
app.get('/verify', (req, res) => {
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
    }else {
        res.send({ ok: 0 })
    }
})
app.listen(5000, () => {
    console.log("服务已启动，5000端口监听中...")
})