import React from 'react';

const Answer = (props) => {
  const unselectNumber = (clickedNumber) => {
    props.updateSelectedNumbers(props.selectedNumbers.filter(
      number => number !== clickedNumber
    ))
  }
	return (
  	<div className="col-5">
      {props.selectedNumbers.map((number, i) =>
      	<span key={i} onClick={() => unselectNumber(number)}>
        	{number}
        </span>
      )}
    </div>
  )
}

export default Answer