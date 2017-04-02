import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { selectStream, fetchStreamsIfNeeded, invalidateStream } from '../actions'
import Search from './Search'
import StreamList from '../components/StreamList'
import CircularProgress from 'material-ui/CircularProgress'

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
        <header>
          <div className="container">
            <Search
              value={selectedStream}
              onChange={this.handleChange}
            />
          </div>
        </header>
        <div className="container">
          <div>
            {lastUpdated &&
                <span>
                  Last updated at {new Date(lastUpdated).toLocaleTimeString()}.
                  {' '}
                </span>
            }
            {!isFetching &&
                <a href='#'
                  onClick={this.handleRefreshClick}>
                  Refresh
                </a>
            }
          </div>
          {isFetching && streams.length === 0 &&
              <div style={{display: 'flex', justifyContent: 'center'}}>
                <CircularProgress />
              </div>
          }
          {!isFetching && streams.length === 0 &&
              <h1>No streams found for search: {selectedStream}</h1>
          }
          {streams.length > 0 &&
              <div style={{ opacity: isFetching ? 0.5 : 1 }}>
                <h1>Showing results for search: {selectedStream}</h1>
                Total results: {streams.length}
                <StreamList streams={streams} />
              </div>
          }
        </div>
      </div>
    )
  }
}

App.propTypes = {
  selectedStream: PropTypes.string.isRequired,
  streams: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  const { selectedStream, streamsByStream } = state

  const {
    isFetching,
    lastUpdated,
    items: streams
  } = streamsByStream[selectedStream] || {
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
