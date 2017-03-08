// const MongoClient = require('mongodb').MongoClient;
const {MongoClient,ObjectID} =require('mongodb');

var url = 'mongodb://localhost:27017/TodoApp';
MongoClient.connect(url,(err,db)=>{
  if(err){
   return console.log('unable to connect to mongo server ');
  }
  console.log('connected to mongodb server');
db.collection('Users').findOneAndUpdate({
  name:'irfan'
},{
  $set:{
    name:'mohammed irfan'

  },
  $inc:{age:+1}
},{
  returnOriginal:false
}).then((rs)=>{
  console.log(rs);
})
  //db.close();
});
