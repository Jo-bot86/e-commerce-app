const User = require('../models/user');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/e-commerce-shop', { useUnifiedTopology: true })
  .then(() => {
    console.log('Mongo Connection Open!!');
  })
  .catch(err => {
    console.log('Mongo Connection Error!!');
    console.log(err);
  });



const passwordMax = encryptPassword('12345');
const passwordJohn = encryptPassword('abcde');

const seedUsers = [{
  firstName: 'Max',
  lastname: 'Mustermann',
  emailAddress: 'maxmustermann@posteo.de',
  password: passwordMax
},
{
  firstName: 'John',
  lastname: 'Doe',
  emailAddress: 'john@doe.com',
  password: passwordJohn
}
]



/* User.insertMany(seedUsers)
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.log(err);
  })
 */