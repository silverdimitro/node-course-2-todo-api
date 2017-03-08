// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} =require('mongodb');

var url = 'mongodb://localhost:27017/TodoApp';
MongoClient.connect(url,(err,db)=>{
  if(err){
   return console.log('unable to connect to mongo server ');
  }
  console.log('connected to mongodb server');
  // db.collection('Todos').deleteOne({
  //   _id:new ObjectID('58bf9f8e1335d3127821a58d')
  // }).then((result)=>{
  //   console.log(result);
  // });
    db.collection('Todos').deleteMany({
      text:'walk the dog'
    }).then((res)=>{console.log(res);});

  //db.close();
});
