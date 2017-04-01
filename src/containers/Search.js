import React from 'react';
import { connect } from 'react-redux'
import { addStream } from '../actions'

// import SearchBar from '../components/SearchBar'
// import SearchButton from '../components/SearchButton'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

let Search = ({ dispatch }) => {
  let input

  const submitSearch = (e) => {
    e.preventDefault()

    if (input.value === '') {
      return
    }

    dispatch(addStream(input.value))
    input.value = ''
  }

  return (
    <div>
      <form onSubmit={submitSearch}>
        <TextField ref={(node) => {
            console.log(node.input.value)
            input = node.input
          }}
          hintText="Search query..."
          floatingLabelText="Twitch Streams"
        />
        <RaisedButton
          label="Submit Search"
          primary={true}
          onClick={submitSearch}
        />
      </form>
    </div>
  );
}

Search = connect()(Search)

export default Search;
