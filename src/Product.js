import React, { Component } from 'react';
import logo from './logo.svg';
// import Fancy from 'react-fancy-component';

import VisibilitySensor from 'react-visibility-sensor'

import './App.css';

class Product extends Component {
  state = {active: true};
  render() {
    const onChange = (isVisible) => {
        if (isVisible) {
            this.setState({active: false});
        }
        console.log('Element is now %s', isVisible ? 'visible' : 'hidden');
    };

    return (
      <VisibilitySensor onChange={onChange} active={this.state.active}>
      <div className="App">
        <p className="App-intro">
          Product
        </p>
      </div>
      </VisibilitySensor>

    );
  }
}

export default Product;
