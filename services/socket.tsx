import io from 'socket.io-client';

const socket = io('http://192.168.0.106:3002', {autoConnect: false});

function connect() { 
  socket.connect();
  
  console.log("conn1");  
  socket.on('connect', () => { 
    console.log("conn2"); 
    socket.emit("newUser",{ name: 'Thales' });
  });
}

function disconnect() {
  if(socket.connected) {
    socket.disconnect();
  }
}

export { connect, disconnect };