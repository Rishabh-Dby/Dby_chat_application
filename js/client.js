//all dom elements
const socket=io.connect('http://localhost:3000');
const form=document.getElementById('sendcontainer');
const messageinput=document.getElementById('messageinp');
const messagecontainer=document.querySelector(".container");

//message audio
var audio=new Audio('msgtune.mp3');

//fundtion append that is used to append dom object into container on send or receive
const append=(message,position)=>{
    const messageElement=document.createElement('div');
    messageElement.innerText=message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messagecontainer.append(messageElement);
    messagecontainer.scrollTop=messagecontainer.scrollHeight; //keep the scroll down 
    
    //if sent by others then audio will play
    if(position=='left'){
        audio.play();
    }
}

//what will happen when when we click on send button for message
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(messageinput.value);
    const message=messageinput.value;
    messageinput.value="";
    append(`You: ${message}`,'right');
    socket.emit('send',message);
});

//asking your name at the start
const names = prompt("enter your name to join");
console.log(names);
socket.emit("new-user-joined", names); 

//register your name on socket
socket.on('user-joined',names=>{
    append(`${names} joined the chat`,'left');
})

// if server sends message then receive it
socket.on('receive',(data)=>{
    append(`${data.name}: ${data.message}`,'left');
})

// if user leaves the chat then append the message (left the chat)
socket.on('left',name=>{
    append(`${name} left the chat`,'left')
})

