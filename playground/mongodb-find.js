
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    /*db.collection('Todos').find(
        {
            _id: new ObjectID('5c3f78c96c0cfb724d9fb095')
        }).toArray()
    .then((docs) => {
        console.log('Todos');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });*/

    /*db.collection('Todos').count()
    .then((count) => {
        console.log(`Todos count: ${count}`);
    }, (err) => {
        console.log('Unable to fetch todos', err);
    });*/

    db.collection('Users').find({name: 'Joaquin'}).toArray()
    .then((docs) => {
        console.log(JSON.stringify(docs, undefined, 2));
    });



    //client.close();
});