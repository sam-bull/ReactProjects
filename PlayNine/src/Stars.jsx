import React from 'react';

const Stars = (props) => {
  let arr = []
  for (let i=0; i<props.numberOfStars; i++) { arr.push(i) }
	return (
  	<div className="col-5">
      {arr.map(i =>
      <i key={i} className="fa fa-star"></i>)}
    </div>
  )
}

export default Stars