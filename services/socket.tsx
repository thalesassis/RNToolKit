import io from 'socket.io-client';

const socket = io('http://192.168.0.103:3002', {autoConnect: false});


function connect(userName, callback:any) { 
  socket.connect();
  socket.on('connect', () => { 
    
    socket.emit("newUser",{ name: userName });
  });

  socket.on('userList', function(userList:any) {
    callback(userList);
  })
}

function disconnect() {
  if(socket.connected) {
    console.log("disconnected");
    socket.disconnect();
  }
}

export { connect, disconnect };