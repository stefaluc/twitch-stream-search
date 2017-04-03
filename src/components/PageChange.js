import React from 'react'
import { STREAMS_PER_PAGE } from '../containers/App'

const PageChange = (props) => {
  // true/false whenever or not page is first or last
  const first = !props.pageNumber
  const last = props.pageNumber + 1 >= props.streamCount / STREAMS_PER_PAGE
  return (
    <div>
      {!first &&
        <i className="material-icons icon" onClick={props.onDecrement}>keyboard_arrow_left</i>}
      <span style={{position:'relative', bottom: 5}}>{' ' + (props.pageNumber + 1) + ' '}</span>
      {!last &&
        <i className="material-icons icon" onClick={props.onIncrement}>keyboard_arrow_right</i>}
    </div>
  )
}

export default PageChange 
