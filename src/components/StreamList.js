import React from 'react'
import Stream from './Stream'

const StreamList = ({ streams }) => {
  <div>
    {streams.map(stream =>
      <Stream
        key={stream.id}
        {...stream}
      />
    )}
  </div>
}

export default StreamList
