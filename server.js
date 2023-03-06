const express = require('express')
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

app.post('/login',(req,res)=>{
    console.log(req.body)
    res.send('ok')
})
app.listen(5000,()=>{
    console.log("服务已启动，5000端口监听中...")
})