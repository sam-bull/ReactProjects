import React, { Component } from 'react';
import './index.css'

class SelectBoard extends Component {
  render() {
    const { selectBoard } = this.props;
    return (
      <div>
        <button onClick={() => selectBoard(3)}>
          3x3
      </button>
        <button onClick={() => selectBoard(4)}>
          4x4
      </button>
        <button onClick={() => selectBoard(5)}>
          5x5
      </button>
      </div>
    )
  }
}

export default SelectBoard