
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    //deleteMany
    db.collection('Todos').deleteMany({
        text: 'Eat lunch'
    }).then((result) => {
        console.log(result);
    });
    db.collection('Users').deleteMany({name: 'Daniel'});
    db.collection('Users').findOneAndDelete({
        _id: new ObjectID('5c3f7e9d6c0cfb724d9fb374')
    })
    .then((results) => {
        console.log(JSON.stringify(results, undefined, 2));
    });
    //deleteOne
    db.collection('Todos').deleteOne({
        text: 'Eat lunch'
    }).then((result) => {
        console.log(result);
    });
    //findOneAndDelete
    db.collection('Todos').findOneAndDelete({completed: false})
    .then((result) => {
        console.log(result);
    });
    //client.close();
});