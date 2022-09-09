const io=require('socket.io')(3000);
const users={};
// io.on will listen for different people joining the chat and will execute the function 
//socket.on will handle the particular user
io.on('connection', socket=>{
    
    socket.on('new-user-joined',name=>{
        users[socket.id]=name;

        console.log("new user joined",name);
        //new person joined then it will inform all the other users by broadcasting user joined and will provide their name
        //the event name can be kept what ever we want ie user-joined is not inbuilt
        //but events like send and disconnect are predefined 
        socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message: message,name:users[socket.id]})
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id];
    });
})