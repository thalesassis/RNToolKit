import io from 'socket.io-client';
import { initialState } from '../shared/GlobalState';

const socket = io('http://192.168.0.103:3002', {autoConnect: false});


function connect(userName, callbackConnected:any, callbackUserId:any) { 
  socket.connect();
  socket.on('connect', () => {     
    socket.emit("newUser",{ name: userName });
  });

  socket.on('userList', function(userList:any) {
    callbackConnected(userList);
  })

  socket.on('userId', function(userId:any) {
    callbackUserId(userId,socket);
  })  
  
  socket.on("newMessage", function(msg:any) {
    console.log("Nova mensagem recebida");
  })
}

function disconnect() {
  if(socket.connected) {
    console.log("disconnected");
    socket.disconnect();
  }
}

export { connect, disconnect, socket };