import React, { Component } from 'react';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
  }

  updateSearchTerm(event) {
    this.props.updateSearchTerm(event.target.value);
  }

  render() {
    return (
      <input
        type="text"
        name="search"
        onChange={this.updateSearchTerm}
        placeholder="Search PubMed..."
        style={{
          padding: '15px 25px',
          margin: 'auto',
          fontSize: 28,
          width: '80%',
          display: 'block',
        }}
      />
    );
  }
}
