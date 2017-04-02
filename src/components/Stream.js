import React from 'react'
import LazyLoad from 'react-lazyload'
import CircularProgress from 'material-ui/CircularProgress'
import '../main.css'

const Stream = (props) => {
  console.log(props)
  return (
    <div className="stream">
      <div className="img-container">
        <LazyLoad height={141} width={250} placeholder={<CircularProgress />}>
          <a href={props.channel.url} target="_blank">
            <img src={props.preview.medium} alt=""/>
          </a>
        </LazyLoad>
      </div>
      <h2>{props.channel.status}</h2>
      Game: {props.game}
      <br />
      Streamer: <a href={props.channel.url}>{props.channel.name}</a>
      <br />
      <div className="viewcount">{props.viewers} viewers</div>
    </div>
  )
}

export default Stream
