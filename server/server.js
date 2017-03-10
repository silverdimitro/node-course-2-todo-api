var express = require('express');
var bodyParser = require('body-parser');
const _ = require('lodash');

const port = process.env.PORT || 3000;
var {mongoose}=require('./db/mongoose');
var {Todo}=require('./models/todo');
var {User}=require('./models/user');
const {ObjectID}=require('mongodb');

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

app.post('/users',(req,res)=>{
  var body= _.pick(req.body,['email','password'])
  var users = new User(body);
  users.save().then((doc)=>{
    res.send(doc);
  },(e)=>{
    res.status(400).send(e);
  })
});
app.patch('/todos/:id',(req,res)=>{
  var id = req.params.id;
  var body = _.pick(req.body,['text','completed']);
  if(!ObjectID.isValid(id)){
    return  res.status(404).send('not a valid id')
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt= new Date().getTime();
  }else {
    body.completed=false;
    body.completedAt=null;
  }
  Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  });

});

app.get('/',(req,res)=>{
  res.send('this is a root');
});

app.get('/todos/:id',(req,res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return  res.status(404).send('not a valid id')
  }
  Todo.findById(id).then((todo)=>{
      if(!todo){
        return res.send(`404 id not found ${todo}`)
      }
    res.send({todo});
  },(e)=>{
    res.status(404);
  }).catch((e)=>{
    res.status(400)
    console.log('error',res.status());})

});
app.delete('/todos/:id',(req,res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)){
    return res.status(404).send();

  }
  Todo.findByIdAndRemove(id).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  });


});


app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  },(e)=>{res.status(400).send(e)});

});




app.listen(port,()=>{
  console.log(`server started at ${port}`);
})
module.exports = {app};














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
