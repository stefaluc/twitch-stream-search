import React, { Component } from 'react';
import Search from './Search';
import StreamListContainer from './StreamListContainer';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <div className="container">
            <Search />
          </div>
        </header>
        <div className="container">
          <StreamListContainer />
        </div>
      </div>
    );
  }
}

export default App;
