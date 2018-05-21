import React, { Component } from 'react';
import './App.css';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './../node_modules/font-awesome/css/font-awesome.css';

const range1to10 = [1,2,3,4,5,6,7,8,9]

const Stars = (props) => {
  let arr = []
  for (let i=0; i<props.numberOfStars; i++) { arr.push(i) }
	return (
  	<div className="col-5">
      {arr.map(i =>
      <i key={i} className="fa fa-star"></i>)}
    </div>
  );
};

const Button = (props) => {
	let button;
  switch(props.answerIsCorrect) {
  	case true:
    	button =
      <button className="btn btn-success" onClick={props.acceptAnswer}>
      	<i className="fa fa-check"></i>
      </button>;
      break;
    case false:
    	button =
      <button className="btn btn-danger" onClick={props.tryAgain}>
      	<i className="fa fa-times"></i>
      </button>;
      break;
    default: 
    	button =
      <button className="btn" 
      onClick={props.checkAnswer}
      disabled={props.selectedNumbers.length === 0}>
      	=
      </button>;
      break;
  }
	return (
  	<div className="col-2 text-center">
    	{button}
      <br /><br />
      <button className="btn btn-warning btn-sm" 
      onClick={props.redraw}
      disabled={props.numberOfRedraws <= 0}>
      	{props.numberOfRedraws}
      </button>
    </div>
  );
};

const Answer = (props) => {
	return (
  	<div className="col-5">
      {props.selectedNumbers.map((number, i) =>
      	<span key={i} onClick={() => props.unselectNumber(number)}>
        	{number}
        </span>
      )}
    </div>
  );
};

const Numbers = (props) => {
  const numberClassName = (number) => {
    if (props.usedNumbers.indexOf(number) >= 0) {
      return 'used';
    }
    if (props.selectedNumbers.indexOf(number) >= 0) {
      return 'selected';
    }
  }
	return (
  	<div className="card text-center">
    	<div>
      	{range1to10.map((number, i) =>
        	<span key={i} className={numberClassName(number)} onClick={() => props.selectNumber(number)}>
          	{number}
          </span>
        )}
      </div>
    </div>
  );
};

const DoneFrame = (props) => {
	return (
  	<div className="text-center">
    	<h2>{props.doneStatus}</h2>
      <button className="btn btn-secondary" onClick={props.resetGame}>Play Again</button>
    </div>
  )
}

class Game extends Component {
	static randomNumber = () => Math.ceil(Math.random()*9);
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
  		if (prevState.usedNumbers.length === 9) {
      	return { doneStatus: 'You win!' };
      }
      let remainingNumbers = range1to10.filter(x => !prevState.usedNumbers.includes(x));
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

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

class App extends Component {
	render () {
  	return (
    	<div>
      	<Game />
      </div>
    );
  }
}

export default App;
