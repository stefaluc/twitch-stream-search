import React from 'react'
import Stream from './Stream'

const StreamList = (props) => {
  return (
    <div>
      {props.streams.map((stream, id) =>
        <Stream
          key={id}
          {...stream}
        />
      )}
    </div>
  )
}

export default StreamList
