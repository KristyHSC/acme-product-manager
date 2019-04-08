import React from 'react';
import { Link } from 'react-router-dom'

export const Nav = () => {
  return(
    <div className='Navbar'>
      <Link to='/'>Home</Link>
      <Link to='/products'>Products</Link>
      <Link to='/managers'>Managers</Link>
    </div>
  )
}

