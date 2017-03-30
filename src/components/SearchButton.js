import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

const SearchButton = () => {
  return (
    <div>
      <RaisedButton
        label="Submit Search"
        primary={true}
        style={{margin: 12}}
      />
    </div>
  );
}

export default SearchButton
