import React from 'react'
import { Product } from './Product'


export const Products = (props) => {
  const {products, managers} = props
  return (
    <div>
      {products.map(product => (
        <Product product = {product} managers = {managers}/>
      ))}
    </div>
  )
}
