import React from 'react'
import LazyLoad from 'react-lazyload'
import CircularProgress from 'material-ui/CircularProgress'
import '../css/Stream.css'

const Stream = (props) => {
  return (
    <div className="stream">
      <div className="img-container">
        <LazyLoad height={141} width={250} placeholder={<CircularProgress />}>
          <a href={props.channel.url} target="_blank">
            <img src={props.preview.medium} alt=""/>
          </a>
        </LazyLoad>
      </div>
      <div className="content">
        <h2>{props.channel.status}</h2>
        <span className="bold1">Game:</span> {props.game}
        <br />
        <span className="bold1">Streamer:</span> <a href={props.channel.url}>{props.channel.name}</a>
        <div className="bottom-right">{props.viewers} viewers</div>
      </div>
    </div>
  )
}

export default Stream
