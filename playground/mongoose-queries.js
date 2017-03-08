const {mongoose} = require('./../server/db/mongoose');
const {User}=require('./../server/models/user');
const {ObjectID}= require('mongodb');

var id='58bfdf3575661c05948c2775';

if(!ObjectID.isValid(id)){
  console.log('not a valid id ');
}
User.findById(id).then((todo)=>{
  if(!todo){
   return  console.log('id not found');
  }
    console.log('id found ',todo);
}).catch((e)=>{console.log(e);})
