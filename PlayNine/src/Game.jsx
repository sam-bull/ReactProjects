import React, { Component } from 'react';
import './App.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './../node_modules/font-awesome/css/font-awesome.css';
import Stars from './Stars'
import Button from './Button'
import Answer from './Answer'
import { range, Numbers } from './Numbers'
import DoneFrame from './DoneFrame'

const rangeSize = range.length

class Game extends Component {
	static randomNumber = () => Math.ceil(Math.random()*rangeSize)
	state = { 
  	selectedNumbers: [],
  	numberOfStars: Game.randomNumber(),
    answerIsCorrect: null,
    usedNumbers: [],
    numberOfRedraws: 5,
    doneStatus: ''
  };
  
  selectNumber = (clickedNumber) => {
  	if (this.state.selectedNumbers.indexOf(clickedNumber) >= 0) { return; }
  	this.setState(prevState => ({
    	answerIsCorrect: null,
    	selectedNumbers: prevState.selectedNumbers.concat(clickedNumber)
    }));
  };
  
  unselectNumber = (clickedNumber) => {
  	this.setState(prevState => ({
    	answerIsCorrect: null,
    	selectedNumbers: prevState.selectedNumbers.filter(
      	number => number !== clickedNumber
      )
    }));
  }
  
  checkAnswer = () => {
  	this.setState(prevState => ({
    	answerIsCorrect: prevState.numberOfStars === prevState.selectedNumbers.reduce((acc, n) => acc + n, 0)
    }))
  };
  
  acceptAnswer = () => {
  	this.setState(prevState => ({
    	usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
      selectedNumbers: [],
    	answerIsCorrect: null,
      numberOfStars: Game.randomNumber(),
    }), this.isGameOver);
  }
  
  tryAgain = () => {
  	this.setState(prevState => ({
      selectedNumbers: [],
    	answerIsCorrect: null,
    }));
  }
  
  redraw = () => {
  	this.setState(prevState => ({
      numberOfStars: Game.randomNumber(),
      numberOfRedraws: (prevState.numberOfRedraws - 1),
    }), this.isGameOver);
  }
  
  isGameOver = () => {
    this.setState(prevState => {
  		if (prevState.usedNumbers.length === rangeSize) {
      	return { doneStatus: 'You win!' };
      }
      let remainingNumbers = range.filter(x => !prevState.usedNumbers.includes(x));
      let possibleTotals = this.sumTotals(0, remainingNumbers, []);
      let cannotWin = this.includes(possibleTotals, prevState.numberOfStars)
      if (prevState.numberOfRedraws === 0 && cannotWin) {
      	return { doneStatus: 'Game Over!' };
      }
    })
  }
  
  sumTotals = (i, arr, final) => {
  	if (arr.length === 0) return 0;
  	for (var j=0; j<arr.length; j++) {
    	final.push(i + arr[j]);
      this.sumTotals(arr[j], arr.slice(j+1), final);
    }
    return final
  }

  includes = (arr, value) => {
    for (let i=0; i<arr.length;i++) {
      if (arr[i]===value) return true;
    }
    return false;
  }
  
  resetGame = () => {
  	this.setState(prevState => ({
      selectedNumbers: [],
      numberOfStars: Game.randomNumber(),
      answerIsCorrect: null,
      usedNumbers: [],
      numberOfRedraws: 5,
      doneStatus: ''
    }))
  }
  
	render() {
  const { 
    selectedNumbers, 
    numberOfStars, 
    answerIsCorrect,
    usedNumbers,
    numberOfRedraws,
    doneStatus
  } = this.state;
  	return (
    	<div class="container">
      	<h3>Play Nine</h3>
        <hr />
        <div className="row">
          <Stars numberOfStars={numberOfStars}/>
          <Button selectedNumbers={selectedNumbers}
          				checkAnswer={this.checkAnswer}
                  answerIsCorrect={answerIsCorrect}
                  acceptAnswer={this.acceptAnswer}
                  tryAgain={this.tryAgain}
                  numberOfRedraws={numberOfRedraws}
                  redraw={this.redraw} />
          <Answer selectedNumbers={selectedNumbers}
          				unselectNumber={this.unselectNumber} />
        </div>
        <br />
        {doneStatus ? 
        	<DoneFrame doneStatus={doneStatus}
          						resetGame={this.resetGame}/> :
          <Numbers selectedNumbers={selectedNumbers}
                  selectNumber={this.selectNumber}
                  usedNumbers={usedNumbers} /> }
      </div>
    );
  }
}

export default Game;
