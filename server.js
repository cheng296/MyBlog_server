const express = require('express')
const cors = require("cors")
const mongoose = require('mongoose')
const blogManage = require('./router/blogManage');
const accountManage = require('./router/accountManage');
const app = express()

mongoose.connect("mongodb://cxm:cheng296@8.130.107.163:27017/blog?authSource=admin",{useNewUrlParser: true,useUnifiedTopology: true}).then(res=>{
    console.log('连接成功');
}).catch((err)=>{
    console.log('连接失败');
})

app.use(cors())

app.use(express.json())

app.use('/accountManage',accountManage)

app.use('/blogManage',blogManage)

app.listen(5000, () => {
    console.log("服务已启动,5000端口监听中...")
})