import React, { Component } from 'react'
import './App.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../node_modules/bootstrap/dist/js/bootstrap.min.js'
import './../node_modules/font-awesome/css/font-awesome.css'
import Stars from './Stars'
import Button from './Button'
import Answer from './Answer'
import Numbers from './Numbers'
import DoneFrame from './DoneFrame'

const numberOfNumbers = 9

const defaultState = (randomNumber) => ({
  selectedNumbers: [],
  numberOfStars: randomNumber,
  answerIsCorrect: null,
  usedNumbers: [],
  numberOfRedraws: 5,
  doneStatus: ''
})

const randomNumber = () => Math.ceil(Math.random() * numberOfNumbers)

class Game extends Component {
  state = defaultState(randomNumber)

  updateSelectedNumbers = (selectedNumbers) => {
    this.setState({
      answerIsCorrect: null,
      selectedNumbers: selectedNumbers
    })
  }

  checkAnswer = () => {
    this.setState(prevState => ({
      answerIsCorrect: prevState.numberOfStars === prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
    }))
  }

  acceptAnswer = () => {
    this.setState(prevState => ({
      usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
      answerIsCorrect: null,
      numberOfStars: randomNumber(),
    }), this.isGameOver)
  }

  redraw = () => {
    this.setState(prevState => ({
      numberOfStars: randomNumber(),
      numberOfRedraws: (prevState.numberOfRedraws - 1),
    }), this.isGameOver)
  }

  isGameOver = () => {
    this.setState(prevState => {
      if (prevState.usedNumbers.length === numberOfNumbers) {
        return { doneStatus: 'You win!' };
      }
      let remainingNumbers = Array(numberOfNumbers).fill().filter(x => !prevState.usedNumbers.includes(x));
      let possibleTotals = this.sumTotals(0, remainingNumbers, []);
      let cannotWin = this.includes(possibleTotals, prevState.numberOfStars)
      if (prevState.numberOfRedraws === 0 && cannotWin) {
        return { doneStatus: 'Game Over!' }
      }
    })
  }

  sumTotals = (i, arr, final) => {
    if (arr.length === 0) return 0
    for (var j = 0; j < arr.length; j++) {
      final.push(i + arr[j])
      this.sumTotals(arr[j], arr.slice(j + 1), final)
    }
    return final
  }

  includes = (arr, value) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === value) return true
    }
    return false
  }

  resetGame = () => {
    this.setState(defaultState(Game.randomNumber))
  }

  render() {
    const {
      selectedNumbers,
      numberOfStars,
      answerIsCorrect,
      usedNumbers,
      numberOfRedraws,
      doneStatus
    } = this.state
    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr />
        <div className="row">
          <Stars numberOfStars={numberOfStars} />
          <Button selectedNumbers={selectedNumbers}
            updateSelectedNumbers={this.updateSelectedNumbers}
            checkAnswer={this.checkAnswer}
            answerIsCorrect={answerIsCorrect}
            acceptAnswer={this.acceptAnswer}
            numberOfRedraws={numberOfRedraws}
            redraw={this.redraw} />
          <Answer selectedNumbers={selectedNumbers}
            updateSelectedNumbers={this.updateSelectedNumbers}
          />
        </div>
        <br />
        {doneStatus ?
          <div className="text-center">
            <h2>{doneStatus}</h2>
            <button className="btn btn-secondary" onClick={this.resetGame}>Play Again</button>
          </div> :
          <Numbers selectedNumbers={selectedNumbers}
            updateSelectedNumbers={this.updateSelectedNumbers}
            usedNumbers={usedNumbers} />}
      </div>
    )
  }
}

export default Game
