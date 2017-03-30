import React, { Component } from 'react';
import Search from '../Search/Search';
import StreamList from '../../components/StreamList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Search />
        <br />
        <br />
        <StreamList />
      </div>
    );
  }
}

export default App;
