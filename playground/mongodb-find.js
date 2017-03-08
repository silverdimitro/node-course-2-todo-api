// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} =require('mongodb');

var url = 'mongodb://localhost:27017/TodoApp';
MongoClient.connect(url,(err,db)=>{
  if(err){
   return console.log('unable to connect to mongo server ');
  }
  console.log('connected to mongodb server');
  db.collection('Todos').find({name:'irfan'}).toArray().then((done)=>{
    console.log(JSON.stringify(done,undefined , 2));
  },(err)=>{
    console.log('unalble to connect ',err);
  });
  db.close();
});
