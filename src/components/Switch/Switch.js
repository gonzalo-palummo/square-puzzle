import React, { Component } from 'react';
import './Switch.css';

class Switch extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <label className="switch">
        <input
          type="checkbox"
          name={this.props.name}
          checked={this.props.checked}
          onChange={this.props.onInputChange}
        />
        <span className="slider-switch round"></span>
        <span className="labelText">{this.props.label}</span>
      </label>
    );
  }
}

export default Switch;
