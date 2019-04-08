import React, { Component } from 'react'
import axios from 'axios';

export class Product extends Component {
  constructor(props){
    super(props)
    this.state = {
      managerId: 0
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }
  
  changeHandler = (event) => {
    var selectedId = event.target.value
    this.setState({managerId: selectedId})
    //console.log(this.state.managerId)
  }
  
  submitHandler = (id) => {
    axios.put(`/api/product/${id}`, this.state)
      .catch(error => console.log(`There is an error: ${error}`))
  }

  render(){
    const {product, managers} = this.props
    return (
      <div>
        <ul key={product.id}>
          {product.name}
          <p>Product manager</p>
          <select name="manager" id={product.managerId} defaultValue = {product.managerId} onChange={this.changeHandler}>
            <option value = {this.state.managerId}>None</option>
            {managers.map(manager => (
              <option key={manager.id} value={manager.id} >{manager.name}</option>
            ))}
          </select>
          <button onClick={() => this.submitHandler(product.id)}>Save</button>
        </ul>
      </div>
    )
  }
}