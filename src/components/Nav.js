import React from 'react';
import {NavLink} from 'react-router-dom';

const Nav = () => {
  return(
    <div className="main-nav">
      <ul>
        <li><NavLink to="/sunset">Sunset</NavLink></li>
        <li><NavLink to="/dogs">Dogs</NavLink></li>
        <li><NavLink to="/lake">Lake</NavLink></li>
      </ul>
    </div>
  );
}

export default Nav;