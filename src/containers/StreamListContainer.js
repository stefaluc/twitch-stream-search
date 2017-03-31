import { connect } from 'react-redux'
import StreamList from '../components/StreamList'

const mapStateToProps = (state) => {
  return {
    streams: state.streams
  }
}

const StreamListContainer = connect(
  mapStateToProps,
)(StreamList)

export default StreamListContainer
