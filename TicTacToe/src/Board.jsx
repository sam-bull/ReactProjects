import React, { Component } from 'react';
import './index.css'
import ResetButton from './ResetButton'
import Row from './Row'

const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const defaultState = {
  tiles: Array(9).fill(null),
  xIsNext: true,
  status: 'Next player: X',
}

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState
  }

  reset = () => {
    this.setState((defaultState))
  }

  calculateWinner = (tiles) => {
    const winningLine = lines.filter(line => {
      const tileValues = line.map(x => this.state.tiles[x])
      if (tileValues[0] && 
        tileValues[0] === tileValues[1] && 
        tileValues[1] === tileValues[2]) {
          return tileValues
        }
    })
    return winningLine[0]
  }

  updateStatus = () => {
    const { tiles, xIsNext } = this.state
    let status
    const winner = this.calculateWinner(tiles)
    if (winner) {
      status = `The winner is ${tiles[winner[0]]}!`
    }
    else {
      const gameOver = !tiles.some(tile => tile === null)
      status = gameOver ?
      'Game over, no winner' :
      `Next player: ${xIsNext ? 'X' : 'O'}`
    } 
    this.setState(({ status: status }))
  }

  onClick = (event) => {
    const { tiles, xIsNext } = this.state
    const id = event.target.id
    if (!this.calculateWinner(tiles) && !tiles[id]) {
      const newTiles = tiles.slice()
      newTiles[id] = xIsNext ? 'X' : 'O'
      this.setState(oldState => ({
        tiles: newTiles,
        xIsNext: !oldState.xIsNext,
      }), this.updateStatus)
    }
  }

  render() {
    const { tiles, status } = this.state;
    return (
      <div onClick={this.onClick}>
        <div>{status}</div>
        <Row id={0} tiles={tiles} />
        <Row id={1} tiles={tiles} />
        <Row id={2} tiles={tiles} />
        <div>
          <ResetButton reset={this.reset} />
        </div>
      </div>
    )
  }
}

export default Board