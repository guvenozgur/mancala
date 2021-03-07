const express = require('express') 
const path =require('path') 

const app = express()

const http = require('http').createServer(app)
const io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, '..', '..', 'dist'))) 


app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '..', '..', 'dist', 'public.html'))
})

app.listen(9000) 
