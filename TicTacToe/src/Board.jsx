import React, { Component } from 'react';
import './index.css'
import ResetButton from './ResetButton'
import Row from './Row'
import { winningLines3, winningLines4, winningLines5 } from './WinningLines'

class Board extends Component {
  constructor(props) {
    super(props)
    const size = this.props.boardSize
    this.state = {
      boardSize: size,
      tiles: Array(size * size).fill(null),
      xIsNext: true,
      status: 'Next player: X',
      winner: false,
    }
  }

  reset = () => {
    const size = this.props.boardSize
    this.setState(({
      tiles: Array(size * size).fill(null),
      xIsNext: true,
      status: 'Next player: X',
      winner: false
    }))
  }

  calculateWinner = (boardSize, tiles) => {
    const winningLines = boardSize === 3 ?
      winningLines3 :
      boardSize === 4 ?
        winningLines4 :
        winningLines5

    const conainsWin = winningLines.map(
      line => {
        if (!tiles[line[0]]) return false
        const restOfLine = line.slice(1)
        const lineHasMismatch = restOfLine.some(tile => {
          return tiles[line[0]] !== tiles[tile]
        })
        return !lineHasMismatch
      })
    const result = conainsWin.indexOf(true)
    if (result >= 0) {
      return tiles[winningLines[result][0]]
    }
    return false
  }

  getStatus = (tiles, xIsNext, winner) => {
    let status
    if (winner) {
      status = `The winner is ${winner}!`
    }
    else {
      const gameOver = !(tiles.some(tile => tile == null))
      status = gameOver ?
        'Game over, no winner' :
        `Next player: ${xIsNext ? 'X' : 'O'}`
    }
    return status
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
    const { tiles, status, boardSize } = this.state;
    return (
      <div className="game-board" onClick={this.onClick}>
        <div>{status}</div>
        <Row id={0} tiles={tiles} size={boardSize} />
        <Row id={1} tiles={tiles} size={boardSize} />
        <Row id={2} tiles={tiles} size={boardSize} />
        {boardSize > 3 &&
          <Row id={3} tiles={tiles} size={boardSize} />}
        {boardSize > 4 &&
          <Row id={4} tiles={tiles} size={boardSize} />}
        <div>
          <ResetButton reset={this.reset} />
        </div>
      </div>
    )
  }
}

export default Board