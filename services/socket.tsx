import io from 'socket.io-client';
import { initialState } from '../shared/GlobalState';

const socket = io('http://192.168.0.103:3002', {autoConnect: false});


async function connect(userName, callbackUserId:any) { 
  await socket.connect();
  socket.on('connect', () => {     
    socket.emit("newUser",{ name: userName });
  });

  socket.on('userId', function(userId:any) {
    callbackUserId(userId,socket);
  })  
  
}

function disconnect() {
  if(socket.connected) {
    console.log("disconnected");
    socket.disconnect();
  }
}

function connectSocket(upperContext,callback) {
  //if(upperContext.context.state.myId == '') { disconnect(); }
  
  let myUserExist = upperContext.context.state.userList.filter((socket:any)=>{ return socket.id == upperContext.context.state.myId });
  
  if(myUserExist.length == 0) {
      console.log("connecting");
      connect(upperContext.context.state.myName, (userId:any, socket:any) => {
      upperContext.setState(upperContext.context.setState({isConnected: true})); 
        upperContext.setState(upperContext.context.setState({myId: userId.id}));           
        upperContext.setState(upperContext.context.setState({mySocket: socket})); 
        callback();
    }) 
  } else {
    console.log("already connected");
    callback();
  }
}

export { connect, disconnect, socket, connectSocket };