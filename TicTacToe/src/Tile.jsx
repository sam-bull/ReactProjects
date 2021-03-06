import React, { Component } from 'react'
import './index.css'

class Tile extends Component {
  render() {
    const { value, id } = this.props
    const className = 'tile'
    return (
      <button {...{ className, id }}>
        {value}
      </button>
    )
  }
}

export default Tile