const express = require('express');
const app = express();
const path = require('path');
const {syncAndSeed, User, Product} = require('./db')

syncAndSeed()

const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/app.js', (req, res, next)=> res.sendFile(path.join(__dirname, 'dist', 'main.js')));

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/users', (req, res, next) => {
  User.findAll()
    .then(users => res.send(users))
    .catch(next)
})

app.get('/api/products', (req, res, next) => {
  Product.findAll({
    order: [
      ['name', 'ASC']
    ]
  })
    .then(product => res.send(product))
    .catch(next)
})

app.put('/api/product/:id', (req, res, next) => {
  Product.findByPk(req.params.id)
    .then(product => product.update(req.body))
    .then(() => console.log('success'))
    .then(() => res.status(204).end)
    .catch(next)
})

app.listen(port, ()=> console.log(`listening on port ${port}`))
