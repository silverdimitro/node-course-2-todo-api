const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');







// var data = {
//   id:10
// };
// var token = jwt.sign(data,'123abc');
// console.log(token);
// var decoded = jwt.verify(token,'123abc1');
// console.log("deocded",decoded);
// var message = "hi";
// var hash = SHA256(message).toString();
// console.log(`message ${message} \nhash : ${hash}`);

// var token ={
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
// var resultHash= SHA256(JSON.stringify(token.data)+'somesecret').toString();
// if(resultHash === token.hash){
//   console.log('data not changed');
// }else {
//   console.log('data changed do not trust');
// }
