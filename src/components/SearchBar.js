import React from 'react';
import TextField from 'material-ui/TextField';

export function SearchBar() {
  return (
    <div>
      <TextField
        hintText="Search..."
        floatingLabelText="Stream Query"
      />
    </div>
  );
}

export default SearchBar;
