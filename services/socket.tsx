import io from 'socket.io-client';
import { initialState } from '../shared/GlobalState';

const socket = io('http://192.168.0.103:3002', {autoConnect: false});


async function connect(userName, callbackConnected:any, callbackUserId:any) { 
  await socket.connect();
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

function connectSocket(upperContext,callback) {
  if(upperContext.context.state.myId == '') { disconnect(); }
    
  if(upperContext.context.state.myName != "" && upperContext.context.state.isConnected == false) {
    console.log("connecting");
    connect(upperContext.context.state.myName, 
      (userList:any) => {     
        upperContext.setState(upperContext.context.setState({isConnected: true})); 
        upperContext.setState(upperContext.context.setState({userList: userList})); 
    }, (userId:any, socket:any) => {
        upperContext.setState(upperContext.context.setState({myId: userId.id}));           
        upperContext.setState(upperContext.context.setState({mySocket: socket})); 
        callback();
    }) 
  } else {
    callback();
  }
}

export { connect, disconnect, socket, connectSocket };