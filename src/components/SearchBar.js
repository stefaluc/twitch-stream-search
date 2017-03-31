import React, { Component } from 'react';
import TextField from 'material-ui/TextField';

class SearchBar extends Component {
  render() {
    return (
      <div>
        <TextField
          hintText="Search query..."
          floatingLabelText="Twitch Streams"
        />
      </div>
    );
  }
}

export default SearchBar;
