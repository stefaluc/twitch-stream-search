import React from 'react';
import { connect } from 'react-redux'
import { addStream } from '../actions'

// import SearchBar from '../components/SearchBar'
import SearchButton from '../components/SearchButton'
import TextField from 'material-ui/TextField'

let Search = ({ dispatch }) => {
  let input
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        console.log(input);
        console.log(input.value);
        dispatch(addStream(input.value)) 
        input.value = ''
      }}>
        <TextField ref={(node) => {
          console.log(node)
          console.log(node.input)
          console.log(node.input.value)
          input = node.input
        }}
        hintText="dqwd"
        />
        <SearchButton />
      </form>
    </div>
  );
}

Search = connect()(Search)

export default Search;
