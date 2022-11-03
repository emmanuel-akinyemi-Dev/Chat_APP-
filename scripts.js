 const socket = io('http://localhost:3000');
const messageForm= document.getElementById("send-container");
const messageInput =document.getElementById("message_input");  
const messageContainer =document.getElementById("message_body");


const names = prompt( 'what is your name?');
appendMessage('you joined');
socket.emit('new-user', names)



socket.on('chat-message', (data)=>{
    appendMessage(`${data.names}:${data.message}`);
 }) ;
 
 socket.on('user-connected', (name)=>{
    appendMessage(`${name} connected`);
 }) ; 
 socket.on('user-disconnected', (name)=>{
    appendMessage(`${name} disconnected`);
 }) ; 

 messageForm.addEventListener('submit', button =>{
    button.preventDefault();
    const message =  messageInput.value;
    appendMessage(`you : ${message}`)
    socket.emit('send-message', message );
    messageInput.value =''; 
 }) 

 function appendMessage(message){
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageContainer.append(messageElement);

 }
