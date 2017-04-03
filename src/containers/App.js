import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Search from './Search'
import StreamList from '../components/StreamList'
import PageChange from '../components/PageChange'
import CircularProgress from 'material-ui/CircularProgress'
import { 
  selectStream, 
  fetchStreamsIfNeeded, 
  invalidateStream,
  incrementPage,
  decrementPage,
  resetPageNumber
} from '../actions'

export const STREAMS_PER_PAGE = 10

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
    this.handleIncrement = this.handleIncrement.bind(this)
    this.handleDecrement = this.handleDecrement.bind(this)
  }

  // initial fetch of streams
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

  // passed to Search; resets pageNumber to 0, changes active stream, and fetches active streams
  handleChange(nextStream) {
    this.props.dispatch(resetPageNumber())
    this.props.dispatch(selectStream(nextStream))
    this.props.dispatch(fetchStreamsIfNeeded(nextStream))
  }

  // invalidates current streams and then refetches
  handleRefreshClick(e) {
    e.preventDefault()
    const { dispatch, selectedStream } = this.props
    dispatch(invalidateStream(selectedStream))
    dispatch(fetchStreamsIfNeeded(selectedStream))
  }

  // passed to PageChange; increments pageNumber by 1
  handleIncrement() {
    this.props.dispatch(incrementPage())
  }

  // passed to PageChange; decrements pageNumber by 1
  handleDecrement() {
    this.props.dispatch(decrementPage())
  }

  render() {
    const { selectedStream, streams, isFetching, lastUpdated, pageNumber } = this.props

    // keep track of streams to display for current page
    const firstPage = pageNumber * STREAMS_PER_PAGE
    // do not exceed streams.length
    const temp = (pageNumber * STREAMS_PER_PAGE) + STREAMS_PER_PAGE
    const lastPage = temp > streams.length ? streams.length : temp
    return (
      <div>
        <header>
          <div className="container">
            <Search value={selectedStream} onChange={this.handleChange} />
            <div className="bottom-right">
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
          </div>
        </header>
        <div className="container">
          {isFetching && streams.length === 0 &&
             <div style={{display: 'flex', justifyContent: 'center'}}>
               <CircularProgress />
             </div>
          }
          {!isFetching && streams.length === 0 &&
            <h1>No streams found for search: <span className="bold2">{selectedStream}</span></h1>
          }
          {streams.length > 0 &&
            <div style={{ opacity: isFetching ? 0.5 : 1 }}>
              <h1>
                Showing results {firstPage + 1}-{lastPage} of {streams.length} for search: <span className="bold2">{selectedStream}</span>
              </h1>
              <div className="top-right">
                <PageChange
                  pageNumber={pageNumber}
                  onIncrement={this.handleIncrement} 
                  onDecrement={this.handleDecrement} 
                  streamCount={streams.length}
                />
              </div>
              <StreamList streams={streams.slice(firstPage, lastPage)} />
              <div style={{fontSize: 24, position: 'absolute', right: 0}}>
                <PageChange
                    pageNumber={pageNumber}
                    onIncrement={this.handleIncrement} 
                    onDecrement={this.handleDecrement} 
                    streamCount={streams.length}
                />
              </div>
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
  const { selectedStream, streamsByStream, pageNumber } = state
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
    lastUpdated,
    pageNumber
  }
}

export default connect(mapStateToProps)(App)
