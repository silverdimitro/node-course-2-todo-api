const expect = require('expect');
const request = require('supertest');

var {app} =  require('./../server');
var {Todo}=require('./../models/todo');
const {ObjectID}=require('mongodb');

const todos= [{
  _id:new ObjectID(),
  text:'first test todo'
},{
_id:new ObjectID(),
  text:'second test todo'
}];

beforeEach((done)=>{
  Todo.remove({}).then(()=>{
    return Todo.insertMany(todos);
  }).then(()=>done());
});

describe('post /todos',()=>{

  it('should post some values in db',(done)=>{
    var text = 'todo test text';
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(text);
      })
      .end((err,res)=>{
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos)=>{
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e)=>done(e));
      });
    });

  it('should verify that validator',(done)=>{

      request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err,res)=>{
          if(err)
          {
            return done(err);
          }

          Todo.find().then((todos)=>{
            expect(todos.length).toBe(2);
            done();
          }).catch((e)=>done(e));

        });

  });

});

describe('GET /todos',()=>{
  it('should get all todos',(done)=>{
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res)=>{
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('Get /todos/:id',()=>{
  it('should get the todo ocds',(done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(todos[0].text);
      }).end(done);
  });
  it('should return 404 if todo not found',(done)=>{
    //var hexId=new ObjectID.toHexString();
    request(app)
      .get(`/todos/${!todos[0]._id.toHexString()}`)
      .expect(404)
      .end(done);
  });
  it('should return 404 for invalid id',(done) => {
    request(app)
      .get('/todos/123abd')
      .expect(404)
      .end(done);
  });





});
describe('DELETE /todos/:id',()=>{
  it('should delete  a todo',(done)=>{
    var hexId=todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err,res)=>{
        if(err){
          return done(err);
        }
        Todo.findById(hexId).then((todo)=>{
          expect(todo).toNotExist();
          done();
        }).catch((e)=>done(e));

      });
  });
  it('should return 404 if todo not found',(done)=>{
    var hexId=new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .expect(404)
      .end(done);
  });
  it('should return 404 for non-object ids',(done)=>{
    request(app)
      .delete('/todos/123abd')
      .expect(404)
      .end(done);
});
});
describe('PATCH /todos/:id',()=>{
  it('should UPDATE  a todo',(done)=>{
    var hexId=todos[0]._id.toHexString();
    var text="this should be a text";

    request(app)
      .patch(`/todos/${hexId}`)
      .send({completed:true,text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done );
  });
  it('should clear completedAt ',(done)=>{
    var hexId=todos[1]._id.toHexString();
    var text="this should be a text!!";

    request(app)
      .patch(`/todos/${hexId}`)
      .send({completed:false,text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done );
  });
//   it('should return 404 for non-object ids',(done)=>{
//     request(app)
//       .delete('/todos/123abd')
//       .expect(404)
//       .end(done);
// });
});
