import React from 'react'

const Stars = (props) => {
  return (
    <div className="col-5">
      {Array(props.numberOfStars).fill().map(index =>
        <i key={index} className="fa fa-star"></i>)}
    </div>
  )
}

export default Stars