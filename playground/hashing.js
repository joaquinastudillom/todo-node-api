const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

 var password = '123abc!';

 /*bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    });
 });*/

 var hashedPssword = "$2a$10$kviTQoZOFnSG6thhsYjyAu.gY77gUGy1akg9jBzhLjPIfbie..xBG";
 bcrypt.compare(password, hashedPssword, (err, res) => {
     console.log(res);
 });

/*var data = {
    id: 10
};

var token = jwt.sign(data, '123abc');
console.log(token);

var decoded = jwt.verify(token, '123abc');
console.log('decoded', decoded);*/

/*var message = 'I am user number 3';
var hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);

var data = {
    id: 4
};

var token = {
    data,
    hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
}

var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if(resultHash === token.hash){
    console.log('Data was nor changed');
}else{
    console.log('Data was chaneged. Do not trust');
}*/