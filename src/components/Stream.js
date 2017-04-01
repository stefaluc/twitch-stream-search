import React from 'react'

const Stream = (props) => {
  console.log(props)
  return (
    <div>
      <img src={props.preview.small} />Game: {props.game}
    </div>
  )
}

export default Stream
