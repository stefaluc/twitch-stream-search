import React, { Component } from 'react'
import { connect } from 'react-redux'
import { selectStream, fetchStreamsIfNeeded, invalidateStream } from '../actions'
import Search from './Search'
import StreamListContainer from './StreamListContainer'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedStream } = this.props
    dispatch(fetchStreamsIfNeeded(selectedStream))
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedStream !== prevProps.selectedStream) {
      const { dispatch, selectedStream } = this.props
      dispatch(fetchStreamsIfNeeded(selectedStream))
    }
  }

  handleChange(nextStream) {
    this.props.dispatch(selectStream(nextStream))
    this.props.dispatch(fetchStreamsIfNeeded(nextStream))
  }

  handleRefreshClick(e) {
    e.preventDefault()

    const { dispatch, selectedStream } = this.props
    dispatch(invalidateStream(selectedStream))
    dispatch(fetchStreamsIfNeeded(selectedStream))
  }

  render() {
    const { selectedStream, streams, isFetching, lastUpdated } = this.props
    return (
      <div>
        <Search
          value={selectedStream}
          onChange={this.handleChange}
        />
        <StreamListContainer />
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { selectedStream, streamByStreams } = state
  const {
    isFetching,
    lastUpdated,
    items: streams
  } = streamByStreams[selectedStream] || {
    isFetching: true,
    items: []
  }

  return {
    selectedStream,
    streams,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
