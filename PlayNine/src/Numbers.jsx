import React from 'react'

const range = [1,2,3,4,5,6,7,8,9]

const Numbers = (props) => {
  const numberClassName = (number) => {
    if (props.usedNumbers.indexOf(number) >= 0) {
      return 'used'
    }
    if (props.selectedNumbers.indexOf(number) >= 0) {
      return 'selected'
    }
  }

  const selectNumber = (clickedNumber) => {
    const selectedNumbers = props.selectedNumbers
    if (selectedNumbers.indexOf(clickedNumber) >= 0) { return }
    props.updateSelectedNumbers(selectedNumbers.concat(clickedNumber))
  }

	return (
  	<div className="card text-center">
    	<div>
      	{range.map((number, i) =>
        	<span key={i} className={numberClassName(number)} onClick={() => selectNumber(number)}>
          	{number}
          </span>
        )}
      </div>
    </div>
  )
}

export default Numbers