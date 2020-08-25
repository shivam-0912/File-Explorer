//This includes creating the server

//requirements
const http=require('http');

//input elements
const port=3500;

//file imports
const respond=require('./lib/respond.js');

//creating server
const server=http.createServer(respond);

//listening
server.listen(port,()=>{console.log(`listening through port ${port}`)});
