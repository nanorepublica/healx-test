import React, { Component, Fragment } from 'react';
import ResultItem from './resultItem';

export default class ResultList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        {this.props.results ? (
          <ul
            style={{
              listStyle: 'none',
              width: '80%',
              margin: 'auto',
            }}
          >
            {this.props.results.uids.map(id => (
              <ResultItem key={id} item={this.props.results[id]} />
            ))}
          </ul>
        ) : (
          <div />
        )}
      </Fragment>
    );
  }
}
