import React, { Component } from 'react';
import './index.css'
import Tile from './Tile'

class Row extends Component {
  render() {
    const { id, tiles, size } = this.props
    const tileId = (tile) => id*size+tile
    return (
      <div className="board-row">
        <Tile value={tiles[tileId(0)]} id={tileId(0)} />
        <Tile value={tiles[tileId(1)]} id={tileId(1)} />
        <Tile value={tiles[tileId(2)]} id={tileId(2)} />
        {size>3 &&
        <Tile value={tiles[tileId(3)]} id={tileId(3)} />}
        {size>4 &&
        <Tile value={tiles[tileId(4)]} id={tileId(4)} />}
      </div>
    )
  }
}

export default Row