import React, {Component} from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'
import axios from 'axios'
import { Nav } from './Nav'
import { Products } from './Products'
import { Managers } from './Managers'

class App extends Component {
  constructor(){
    super()
    this.state = {
      products: [],
      managers: []
    }
  }

  componentDidMount(){
    this.loadData();
  }
  
  loadData = () => {
    Promise.all([
      axios.get('/api/products')
        .then(products => products.data),
      axios.get('/api/users')
        .then(managers => managers.data)
    ])
    .then(([products, managers]) => {
      this.setState({products, managers})
    })
  }

  render(){
    const {products, managers} = this.state
    // console.log(products, managers)
    return (
        <Router>
          <div>
            <div className='heading'> 
              <h1>Acme Product Managers</h1>
            </div>
            <Nav />
          </div>
          <Route
            exact path = "/" render =
            {() => (<div>
                    <p>We HAVE openings for Product Managers!</p>
                    </div>)
            } />
          <Route exact path = '/products' component = {
            () => <Products products = {products} managers = {managers}/>
            } />
          <Route exact path = '/managers' component = {
            () => <Managers managers = {managers} />
          } />
        </Router>
    )
  }
}

export default App;