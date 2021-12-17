const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product');
const User = require('./models/user');
const cors = require('cors');
const { createHmac } = require("crypto");

const app = express();
const PORT = 5000;

const encryptPassword = (secret) => {
  const hash = createHmac('sha256', secret)
    .update('I love cupcakes')
    .digest('hex');
  return hash
}

mongoose.connect('mongodb://localhost:27017/e-commerce-shop', {
  useUnifiedTopology: true
}).then(() => {
  console.log("Mongo Connection Open")
}).catch(err => {
  console.log("Mongo Connection Error")
  console.log(err)
})

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.get('/products/search/:searchTerm', async (req, res) => {
  const { searchTerm } = req.params;
  const products = await Product.find();
  const results = products.filter(product => product.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
  res.send(results);
})

app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.send()
})

app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const editedProduct = req.body;
  await Product.findByIdAndUpdate(id, editedProduct)
  res.send()
})

app.get('/products/:id', async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id);
  res.send(product);
})

app.post('/products', async (req, res) => {
  const product = new Product(req.body)
  product.save().then(
    res.send()
  ).catch(err => {
    console.log(err)
  })
})

app.post('/login/:email', async (req, res) => {
  const { email } = req.params;
  const { password } = req.body;
  const foundUser = await User.findOne({ password: encryptPassword(password) })
  if (foundUser) {
    res.send(foundUser.password)
  } else {
    res.send("undefined")
  }
})

app.post('/registration', async (req, res) => {
  const user = req.body
  user.password = encryptPassword(user.password)
  const newUser = new User(user);
  await newUser.save()
  .then(() => {
    res.send(newUser)
  })
  .catch((err) => {
    console.log(err)
  })
    

})

app.post('/login', async (req, res) => {
  const { email } = req.body;
  const foundUser = await User.findOne({ emailAddress: email })
  res.send(foundUser)
})

app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.send(products);
})


app.listen(PORT, () => {
  console.log(`Server is running on PORT http://localhost:${PORT}`);
})