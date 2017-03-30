import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addStream } from '../../actions'

import SearchBar from '../../components/SearchBar';
import SearchButton from '../../components/SearchButton';

let Search = ({ dispatch }) => {
  let id = 0;
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        dispatch(addStream(id++)) 
      }}>
        <SearchBar />
        <SearchButton />
      </form>
    </div>
  );
}

export default Search;
