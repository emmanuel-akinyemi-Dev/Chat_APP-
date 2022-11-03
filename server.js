const express = require('express'); 
const app = express();
 const server = app.listen(3000, console.log("Socket.io  started!"));
const io = require('socket.io')(server, {
    cors:{
        origin:'*'
    }
}) 

const users = {};


io.on('connection',  socket => {
    socket.on( 'new-user', name=>{
        users[socket.id] = name
        socket.broadcast.emit('user-connected', name)
    
    });      
   
    socket.on('send-message' , (message) =>{ 
        socket.broadcast.emit('chat-message', {message:message, names: users[socket.id]});

    } ); 
    socket.on( 'disconnect', (name)=>{ 
        socket.broadcast.emit('user-disconnected', users[socket.id])
        delete  users[socket.id] 
    
    });  
}) 
 