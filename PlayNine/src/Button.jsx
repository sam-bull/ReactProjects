import React from 'react'

// too much logic here
// put state in game
// use onclick in game

const Button = (props) => {
  let className = 'btn'
  let onClick = props.checkAnswer
  let disabled = false
  let buttonSymbol

  switch (props.answerIsCorrect) {
    case true:
      className = "btn btn-success"
      onClick = props.acceptAnswer
      buttonSymbol = <i className="fa fa-check"></i>
      break
    case false:
      className = "btn btn-danger"
      onClick = () => { props.updateSelectedNumbers([]) }
      buttonSymbol = <i className="fa fa-times"></i>
      break
    default:
      buttonSymbol = '='
      disabled = props.selectedNumbers.length === 0
      break
  }
  return (
    <div className="col-2 text-center">
      <button {...{ className, onClick, disabled }}>
        {buttonSymbol}
      </button>
      <br /><br />
      <button className="btn btn-warning btn-sm"
        onClick={props.redraw}
        disabled={props.numberOfRedraws <= 0}>
        {props.numberOfRedraws}
      </button>
    </div>
  )
}

export default Button