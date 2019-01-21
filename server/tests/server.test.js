const expect = require('expect');
const request = require('supertest');
const  {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/Todo');

const todos = [
    {
        _id: new ObjectID(),
        text: "First text todo"
    },
    {
        _id: new ObjectID(),
        text: "Second text todo",
        completed: true,
        completedAt: 333
    }
];

beforeEach((done) => {
    Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => {
        done();
    });
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text';
        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                Todo.find({text}).then((todos) => {
                    expect(todos.length).toBe(1);
                    expect(todos[0].text).toBe(text);
                    done();
                }).catch((e) => done(e));
            });
    });

    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(2);
                    done();
                }).catch((e) => done(e));
            });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
            .get('/todos')
            .expect(200)
            .expect((res) => {
                expect(res.body.todos.length).toBe(2);
            })
            .end(done);
    });
});

describe('GET /todos/:id', () => {
    it('it should return todo doc', (done) => {
        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(todos[0].text);
            })
            .end(done);
    });
    it('should return 404 if todo not found', (done) => {
        //make sure you get a 404 back
        var newId = new ObjectID();
        request(app)
            .get(`/todos/${newId.toHexString()}`)
            .expect(404)
            .end(done);
    });

    it('should return 404 for non-object ids', (done) => {
        // /todos/123
        var newId = 123; 
        request(app)
            .get(`/todos/${newId}`)
            .expect(404)
            .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexId = todos[1]._id.toHexString();     
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.todo._id).toBe(hexId);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                Todo.findById(hexId).then((todo) => {
                    expect(todo).not.toBeTruthy();
                    done();
                }).catch((e) => done(e));
            });    
    });

    it('should return 404 if todo not found', (done) => {
            var hexId = new ObjectID().toHexString();
            request(app)
                .delete(`/todos/${hexId}`)
                .expect(404)
                .end(done); 
    });

    it('should return 404 if object id is invalid', (done) => {
            request(app)
                .delete('/todos/1234a')
                .expect(404)
                .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
        var hexId = todos[0]._id.toHexString();
        var text = "text edited by testing";
        request(app)
            .patch(`/todos/${hexId}`)
            .send({text, completed: true})
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(true);
                expect(typeof res.body.todo.completedAt).toBe('number');
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                done();
            });
    });

    it('should clear completedAt when todo is not completed', (done) => {
        //grab id of second todo item
        //update text, setcompleted to false
        // 200
        //text is changed, completed false, completedAT is null .toNotExist
        var hexId = todos[1]._id.toHexString();
        var text = "another text";
        request(app)
            .patch(`/todos/${hexId}`)
            .send({text, completed: false})
            .expect(200)
            .expect((res) => {
                expect(res.body.todo.text).toBe(text);
                expect(res.body.todo.completed).toBe(false);
                expect(res.body.todo.completedAt).toBeFalsy();
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                }
                done();
            });
    });
});