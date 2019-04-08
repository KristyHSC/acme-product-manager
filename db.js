const Sequelize = require('sequelize')
const conn = new Sequelize(
  process.env.DATABASE_URL ||
  'postgres://localhost:5432/acme_product_manager', {
  logging: false}
)

const User = conn.define('user',{
  name: {
    type: Sequelize.STRING
  }
})

const Product = conn.define('product', {
  name: {
    type: Sequelize.STRING
  }
})

Product.belongsTo(User, {as: "manager"})

const users = [
  {
    id: 1,
    name: 'moe'
  },
  {
    id: 2,
    name: 'larry'
  },
  {
    id: 3,
    name: 'curly'
  }
];

const products = [
  {
    id: 1,
    name: 'foo',
    managerId: 1
  },
  {
    id: 2,
    name: 'bar'
  },
  {
    id: 3,
    name: 'bazz',
    managerId: 2
  }
];


const syncAndSeed = () => {
  return conn.sync({force: true})
    .then(() => users.forEach(user => User.create(user)))
    .then(() => products.forEach(product => Product.create(product)))
    .then(() => console.log('seed success.'))
}

module.exports = {
    syncAndSeed,
    User,
    Product
}