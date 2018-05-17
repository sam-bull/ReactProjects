import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css'

class Square extends Component {
  render() {
    const { onClick, value } = this.props
    const className = 'square'
    return (
      <button {...{ className, onClick }}>
        {value}
      </button>
    );
  }
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }
  handleClick(i) {
    const { squares, xIsNext } = this.state;
    if (this.calculateWinner(squares) || squares[i]) return;
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    this.setState({
      squares: newSquares,
      xIsNext: !xIsNext,
    })
  }
  getLine = (grid, line) => {
    return line.map(x => grid[x])
  }
  calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    const winningLine = lines.filter(line => {
      const squaresValues = line.map(x => this.state.squares[x])
      if (squaresValues[0] && squaresValues[0] == squaresValues[1] && squaresValues[1] == squaresValues[2]) return squaresValues
    })
    return winningLine[0];
  }
  reset = () => {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true,
    })
  }
  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
  }

  render() {
    const winner = this.calculateWinner(this.state.squares)
    const status = winner ? 'The winner is ' + this.state.squares[winner[0]] + '!' : 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
