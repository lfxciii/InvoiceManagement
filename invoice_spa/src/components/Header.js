import React, { Component } from 'react';
import NavBar from './NavBar';

export default class Header extends Component {
  render() {
    return (
      <header>
          <NavBar />
          <h1 style={ headingStyle }><em></em></h1>
      </header>
    )
  }
}
// Define internal CSS rule which can also be used by multiple elements
  const headingStyle = {
    margin: '60px',
    float: 'left'
}
