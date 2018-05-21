import React, { Component } from 'react';
import './index.css'
import Tile from './Tile'

class Row extends Component {
  render() {
    const { id, tiles } = this.props
    const tileId = (tile) => id*3+tile
    return (
      <div className="board-row">
        <Tile value={tiles[tileId(0)]} id={tileId(0)} />
        <Tile value={tiles[tileId(1)]} id={tileId(1)} />
        <Tile value={tiles[tileId(2)]} id={tileId(2)} />
      </div>
    )
  }
}

export default Row