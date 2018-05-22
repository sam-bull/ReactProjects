import React, { Component } from 'react'
import './index.css'
import ResetButton from './ResetButton'
import Row from './Row'
import getWinningLines from './WinningLines'

const defaultState = (size) => ({
  boardSize: size,
  tiles: Array(size * size).fill(null),
  xIsNext: true,
  status: 'Next player: X',
  winner: undefined,
})

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = defaultState(this.props.boardSize)
  }

  reset = () => {
    this.setState(defaultState(this.props.boardSize))
  }

  calculateWinner = (boardSize, tiles) => {
    const winningLines = getWinningLines(boardSize)
    const possibleWinners = winningLines.map(
      line => {
        const firstTile = tiles[line[0]]
        if (!firstTile) return false
        const lineHasWin = line.slice(1).every(tile => {
          return firstTile === tiles[tile]
        })
        return lineHasWin ? firstTile : false
      })
    return possibleWinners.find(winner => winner)
  }

  getStatus = (tiles, xIsNext, winner) => {
    if (winner) {
      return `The winner is ${winner}!`
    }
    const gameOver = !(tiles.some(tile => tile == null))
    return gameOver ?
      'Game over, no winner' :
      `Next player: ${xIsNext ? 'X' : 'O'}`
  }

  onClick = (event) => {
    const { tiles, xIsNext, winner, boardSize } = this.state
    const id = event.target.id
    if (!tiles[id] && !winner) {
      const newTiles = tiles.slice()
      newTiles[id] = xIsNext ? 'X' : 'O'

      const winner = this.calculateWinner(boardSize, newTiles)
      const status = this.getStatus(newTiles, !xIsNext, winner)
      this.setState(oldState => ({
        tiles: newTiles,
        xIsNext: !oldState.xIsNext,
        status: status,
        winner: winner
      }))
    }
  }

  render() {
    const { tiles, status, boardSize } = this.state
    return (
      <div>
        <div>{status}</div>
        <div className="game-board" onClick={this.onClick}>
          <Row id={0} tiles={tiles} size={boardSize} />
          <Row id={1} tiles={tiles} size={boardSize} />
          <Row id={2} tiles={tiles} size={boardSize} />
          {boardSize > 3 &&
            <Row id={3} tiles={tiles} size={boardSize} />}
          {boardSize > 4 &&
            <Row id={4} tiles={tiles} size={boardSize} />}
        </div>
        <div>
          <button onClick={this.reset}>
            Reset
          </button>
        </div>
      </div>
    )
  }
}

export default Board