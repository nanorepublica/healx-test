import React, { Component, Fragment } from 'react';
import ResultItem from './resultItem';

import pubMedApi from '../utils/pubMedApi';
import readingListApi from '../utils/readingListApi';

export default class ResultList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: { uids: [] },
      bookmarkList: [],
      userId: null,
    };
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    var self = this;
    // get the list of UIDs from the backend to pass to the list to generate
    if (this.props.results.length > 0) {
      pubMedApi.getResultDetails(this.props.results, function(json) {
        if (json.result !== undefined) {
          self.setState({ list: json.result });
        }
      });
    }
    this.setState({ userId: window.localStorage.getItem('userID') });
  }

  componentDidUpdate(prevProps) {
    var self = this;
    if (prevProps.results !== this.props.results) {
      if (this.props.results.length > 0) {
        pubMedApi.getResultDetails(this.props.results, function(json) {
          if (json.result !== undefined) {
            self.setState({ list: json.result });
          }
        });
      }
    }
  }

  addItem(item) {
    if (!this.state.bookmarkList.includes(item)) {
      var bookmarkList = this.state.bookmarkList;
      bookmarkList.push(item);
      this.setState({ bookmarkList: bookmarkList }, this.updateRemoteList);
    }
  }

  removeItem(item) {
    if (this.state.bookmarkList.length > 0) {
      var list = this.state.bookmarkList;
    } else {
      list = this.props.results;
    }
    if (list.includes(item)) {
      // remove item from the local version of the list and update state
      var bookmarkList = list;
      this.setState(
        { bookmarkList: list.filter(i => i !== item) },
        this.updateRemoteList
      );
    }
  }

  updateRemoteList() {
    var self = this;
    readingListApi
      .updateList(this.state.userId, this.state.bookmarkList)
      .then(function(resp) {
        self.setState({ userId: resp.ref['@ref'].id }, () => {
          if (
            typeof window !== 'undefined' &&
            !window.localStorage.hasOwnProperty('userID')
          ) {
            window.localStorage.setItem('userID', self.state.userId);
          }
        });
      });
  }

  render() {
    return (
      <Fragment>
        {this.state.list.uids.length > 0 ? (
          <ul
            style={{
              listStyle: 'none',
              width: '80%',
              margin: 'auto',
            }}
          >
            {this.state.list.uids.map(id => (
              <ResultItem
                key={id}
                item={this.state.list[id]}
                removeItem={this.removeItem}
                addItem={this.addItem}
                bookmarkList={this.state.bookmarkList}
                isReadingListPage={this.props.isSavedList}
              />
            ))}
          </ul>
        ) : (
          <div />
        )}
      </Fragment>
    );
  }
}
