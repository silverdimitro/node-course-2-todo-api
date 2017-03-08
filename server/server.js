var express = require('express');
var bodyParser = require('body-parser');

var {mongoose}=require('./db/mongoose');
var {Todo}=require('./models/todo');
var {User}=require('./models/user');

var app =express();
app.use(bodyParser.json());
app.post('/todos',(req,res)=>{
  var todo = new Todo({
    text:req.body.text
  });
  todo.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  })
});
app.listen(3000,()=>{
  console.log("server started at 3000");
})














//
//
// });
// var newUser = new User({
//   email:'mail@gmail.com'
// });
// newUser.save().then((doc)=>{
//   console.log('added email ',doc);
// },(err)=>{
//   console.log('unable to add email ',err);
// });
//
// var newTodo = new Todo({
//   text:'complete this today'
// });
// var secTodo = new Todo({
//   text : 'second instance',
//   completed:true,
//   completedAt: 123
// });

// secTodo.save().then((doc)=>{
//   console.log('added todo ',doc);
// },(err)=>{console.log(err);});
