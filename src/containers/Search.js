import React, { Component } from 'react';
import { connect } from 'react-redux'
import { selectStream } from '../actions'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class Search extends Component {
  constructor(props) {
    super(props)
    this.submitSearch = this.submitSearch.bind(this)
  }

  submitSearch(e) {
    e.preventDefault()
    if (this.inputNode.value === '') {
      return
    }
    this.props.onChange(this.inputNode.value)
    this.inputNode.value = ''
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitSearch}>
          <TextField ref={(node) => {
              this.inputNode = node.input
            }}
            hintText="Search query..."
            floatingLabelText="Twitch Streams"
          />
          <RaisedButton
            label="Submit Search"
            primary={true}
            onClick={this.submitSearch}
          />
        </form>
      </div>
    );
  }
}

export default connect()(Search);
