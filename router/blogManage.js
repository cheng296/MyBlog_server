const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

const BlogType = {
    title: String,
    category: String,
    content: String,
    username: String,
    state: Number,
};
const BlogModel = mongoose.model("blog", new mongoose.Schema(BlogType))

router.post('/add', (req, res) => {
    const { title, category, content, username, state } = req.body
    BlogModel.create({
        title, category, content, username, state
    })
    res.send({ ok: 1 })
});

router.get('/getdraft', (req, res) => {
    const { state, username} = req.query
    BlogModel.find({ state: 1 ,username}).then(data => {
        res.send(data)
    })
});

router.get('/blogPublished', (req, res) => {
    const { state, username} = req.query
    BlogModel.find({ state ,username}).then(data => {
        res.send(data)
    })
});

router.get('/blogPreview', (req, res) => {
    const { _id } = req.query
    BlogModel.find({ _id }).then(data => {
        res.send(data)
    })
});

router.patch('/blogPublish',(req,res)=>{
    const { _id } = req.query
    const {state} = req.body
    BlogModel.updateOne({_id},{state}).then(data=>{
        res.send({ok:1})
    })
});

router.delete('/blogDelete',(req,res)=>{
    const { _id } = req.query
    BlogModel.deleteOne({_id}).then(data=>{
        res.send({ok:1})
    })
});

router.patch('/blogupdate',(req,res)=>{
    const { _id } = req.query
    const {title,category,content,username,state} = req.body
    BlogModel.updateOne({_id},{title,category,content,username,state}).then(data=>{
        res.send({ok:1})
    })
});

router.get('/getAllBlog',(req,res)=>{
    BlogModel.find().then(data=>{
        res.send(data)
    })
});

module.exports = router;