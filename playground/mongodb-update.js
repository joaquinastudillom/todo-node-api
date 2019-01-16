
const {MongoClient, ObjectID} = require('mongodb');



MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
    if(err){
        console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server');
    const db = client.db('TodoApp');

    //findOneAndUpdate
    /*db.collection('Todos').findOneAndUpdate(
        {
            _id: new ObjectID('5c3f80576c0cfb724d9fb3cd')
        }, 
        {
            $set: {
                completed: true
            }
        }, 
        {
            returnOriginal: false
        }
    )
    .then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    });*/

    db.collection('Users').findOneAndUpdate(
        {
            _id: new ObjectID('5c3f7ec26c0cfb724d9fb37f')
        }, 
        {
            $set: {
                name: 'JOAQUIN EDITED'
            },
            $inc: {
                age: 1
            }
        }, 
        {
            returnOriginal: false
        }
    )
    .then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    });
    
    //client.close();
});