import React from 'react';
import { Link } from 'gatsby';

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link />
        <Link to="/"> Hot now </Link>
      </li>
      <li>
        <Link to="/pizzas"> Pizza Menu </Link>
      </li>
      <li>
        <Link to="/"> LOGO </Link>
      </li>
      <li>
        <Link to="/slicemasters"> Slice Masters </Link>
      </li>
      <li>
        <Link to="/order"> Order Ahead! </Link>
      </li>
    </ul>
  </nav>
);

export default Nav;
