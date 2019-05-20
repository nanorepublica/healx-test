import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkOutline } from '@fortawesome/free-regular-svg-icons';

import readingListApi from '../utils/readingListApi';

export default class ResultItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inReadingList: false,
    };
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    // Check with the server that the item is in our list and update local state
    readingListApi.inList(this.props.item.uid).then(inList => {
      this.setState({ inReadingList: inList });
    });
  }

  addItem() {
    readingListApi.addItem(this.props.item.uid).then(response => {
      if (response.statusCode === 200) {
        this.setState({ inReadingList: true });
      }
    });
  }

  removeItem() {
    readingListApi.delete(this.props.item.uid).then(response => {
      console.log(response);
      if (response.statusCode === 200) {
        this.setState({ inReadingList: false });
      }
    });
  }

  render() {
    return (
      <li
        style={{
          padding: '20px',
          border: '1px #663399 solid',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <dl>
          <dt>Title</dt>
          <dd>
            <a
              href={`https://www.ncbi.nlm.nih.gov/pubmed/${
                this.props.item.uid
              }`}
              target="_blank"
            >
              {this.props.item.title}
            </a>
          </dd>
          <dt>Publication Date</dt>
          <dd>{this.props.item.pubdate}</dd>
          <dt>Journal name</dt>
          <dd>{this.props.item.fulljournalname}</dd>
          <dt>Authors</dt>
          <dd>
            {this.props.item.authors.map(author => author.name).join(', ')}
          </dd>
        </dl>
        <div
          style={{
            color: '#639',
            marginRight: 0,
          }}
        >
          {this.state.inReadingList ? (
            <button
              onClick={this.removeItem}
              style={{
                background: 'none!important',
                cursor: 'pointer',
                color: 'inherit',
                border: 'none',
                padding: '0!important',
                font: 'inherit',
              }}
            >
              <FontAwesomeIcon icon={faBookmark} fixedWidth size="2x" />
            </button>
          ) : (
            <button
              onClick={this.addItem}
              style={{
                background: 'none!important',
                cursor: 'pointer',
                color: 'inherit',
                border: 'none',
                padding: '0!important',
                font: 'inherit',
              }}
            >
              <FontAwesomeIcon icon={faBookmarkOutline} fixedWidth size="2x" />
            </button>
          )}
        </div>
      </li>
    );
  }
}
