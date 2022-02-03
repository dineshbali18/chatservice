require('dotenv').config()
const mongoose=require('mongoose')
const express=require('express');
const msgSchema=require('./models/message')
const socket=require('socket.io');
const app=express();
const cors=require('cors')

app.use(cors())
app.use(express.json());


const server=app.listen(process.env.PORT,()=>{
 console.log("server is up and running!")

})
mongoose.connect('mongodb+srv://Bali:DiNeSh5@cluster0.s2y0j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");

const io=socket(server);

io.on('connection',(socket)=>{

console.log(socket.id);
const users={};
// socket.on('username',(userName)=>{
//  const user={
//   name:userName,
//   id:socket.id
//  };
//  users[socket.id]=user;
//  io.emit('connected',user);
//  io.emit("users", Object.values(users));
// })

socket.on('join-room',(data)=>{
 socket.join(data);
 console.log(`joined room ${data}`)
})

socket.on('send-message',(data)=>{
    console.log(data)
    let msg=new msgSchema({
        room:data.room,
        msg:data.content.message,
        user:data.content.author
    })
    msg.save((err,msg1)=>{
        if(err){
            console.log({err})
        }
    })
 io.to(data.room).emit('recieve-msg',data.content)
})

socket.on('disconnect',(socket)=>{
 console.log('user disconnected ;-;')
 delete users[socket.id];
 io.emit("disconnected", socket.id);
})
}
)
  }).catch((e)=>{
    console.log(e);
    console.log("DB NOT CONNECTED SUCCESFULLY");
});
