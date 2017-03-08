const MongoClient = require('Mongodb').MongoClient;
var url = 'mongodb://localhost:27017/My-data';
MongoClient.connect(url,(err,db)=>{
      if (err) {
        return console.log('unable to connect to database server',err);
      }
      db.collection('My').insertOne({name:'my',description:'testing datatbase '},(err,result)=>{
        if (err) {
          return console.log('could not instert data ',err);
        }
        console.log('data inserted ',JSON.stringify(result.ops,undefined,3));
      });
db.close();

});
