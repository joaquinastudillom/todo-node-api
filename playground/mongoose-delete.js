const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/Todo');
const {User} = require('./../server/models/User');

/*Todo.remove({}).then((result) => {
    console.log(result);
});*/

//Todo.findByIdAndRemove
//Todo.findByIdAndDelete

Todo.findByIdAndDelete('5c4505b6a7cab3078441a771').then((todo) =>{
    console.log(todo);
});
