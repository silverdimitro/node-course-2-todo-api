 // const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} =require('mongodb');

var url = 'mongodb://localhost:27017/TodoApp';
 MongoClient.connect(url,(err,db)=>{
   if(err){
    return console.log('unable to connect to mongo server ');
   }
   console.log('connected to mongodb server');
  //  db.collection('Todos').insertOne({
  //    name:'irfan',
  //    location:false
  //  },(err,result)=>{
  //    if(err){
  //      return console.log("error occured",err);
  //    }
  //    console.log(JSON.stringify(result.ops,undefined,2));
  //  });
  db.collection('Users').insertOne({
    name:'irfan',
    description:'new user collection',
    age:24,
    location:'india'

  },(err,result)=>{
    if(err){
      return console.log(err);
    }
    console.log(result.ops);
  });
   db.close();
 });
