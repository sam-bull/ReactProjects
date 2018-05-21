import React, { Component } from 'react';
import './index.css'
import Board from './Board'
import SelectBoard from './SelectBoard'

class Game extends Component {
  constructor(props) {
    super(props)
    this.state = {
      boardSelected: false
    }
  }

  selectBoard = (boardSize) => {
    this.setState(({
      boardSelected: boardSize
    }))
  }
  
  render() {
    const { boardSelected } = this.state;
    return (
      <div className="container">
        <h3>Tic Tac Toe</h3>
        <hr />
        <br />
        {boardSelected ?
          <div>
            <Board boardSize={this.state.boardSelected} />
            <button onClick={() => this.setState(({ boardSelected: false }))}>
              Select board size
            </button>
          </div> :
          <SelectBoard selectBoard={this.selectBoard} />}
      </div>
    )
  }
}

export default Game