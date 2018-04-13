var server = require('http').createServer(),
    io = require('socket.io')(server);

server.listen(1300);

var onlineUsers = [];
io.on('connection', function(socket) {
   socket.on('login', function(data){
   console.log('Korisnik imena ' +data.name+ ' se logirao');
   socket.username = data.name;
   onlineUsers.push(socket.username);
   io.sockets.emit('online', onlineUsers);
   socket.broadcast.emit('logined', socket.username);
    });
    socket.on('chat', function(data) {
        var msg = {
            'user' : socket.username,
            'message' : data.message
        };
        io.sockets.emit('chat', msg);
    });
    socket.on('typing', function(){
        socket.broadcast.emit('typing', socket.username);
    });
    socket.on('disconnect', function(){
        var index =onlineUsers.indexOf(socket.username);
        onlineUsers.splice(index, 1);
        io.sockets.emit('online', onlineUsers);
        socket.broadcast.emit('disconnected', socket.username);
    });
});




