var socket = io('http://localhost:1300');

//QUERY DOM
var message = document.getElementById('message'),
    btn = document.getElementById('send'),
    output = document.getElementById('output'),
    feedback = document.getElementById('feedback'),
    online = document.getElementById('users');

//Functions 

function login() {
    var val= $('#login_input').val();
    socket.emit('login', {name: val});
    $('#dario-chat').removeClass('hidden');
    $('#login').toggle('slow');
}


//Emit events

btn.addEventListener('click', function(){
    socket.emit('chat', {
    message: message.value,
    });
});

message.addEventListener('keypress', function(){
    socket.emit('typing');
});

//Listen for 3v3nts

socket.on('online', function(data) {
    online.innerHTML = '';
    data.forEach(function(value) {
        $('#users').append(value + '<br/>');
    });
});

socket.on('logined', function(data) {
    output.innerHTML += '<i><strong>' +data+ '</strong> has joined!</i><br/>';
});

socket.on('chat', function(data) {
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>'+data.user+' </strong>' + data.message + '</p>';
    $('#message').val("");
});

socket.on('typing', function(data) {
    feedback.innerHTML = '<p><em>' +data+ ' is typing a message...</em></p>';
});

socket.on('disconnected', function(data) {
    output.innerHTML += '<i><strong>' +data+ '</strong> has disconnected!</i><br/>'
});

//JQUERY events
$('#login_input').bind('keyup', function(e){
    if(e.which === 13) {
    login();    
    }
});
