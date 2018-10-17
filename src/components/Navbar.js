import React from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom'

const Navbar = (props) => {
  return (
    <nav className="nav-wrapper red darken-3">
      <div className="container">
        <Link className="left brand-logo" to="/"> Pokeblog</Link>
        <ul className="right hide-on-med-and-down">
          <li><NavLink exact to="/">Feed</NavLink></li>
          <li><NavLink to='/profile'>Profile</NavLink></li>
          <li><NavLink to='/login'>Login</NavLink></li>
          <li><NavLink to='/signup'>Signup</NavLink></li>
          
        </ul>
      </div>
    </nav> 
  )
}

export default withRouter(Navbar)