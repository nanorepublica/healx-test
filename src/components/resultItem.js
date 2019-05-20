import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faBookmarkOutline } from '@fortawesome/free-regular-svg-icons';

import readingListApi from '../utils/readingListApi';

export default class ResultItem extends Component {
  render() {
    const inReadingList = this.props.bookmarkList.includes(this.props.item.uid);
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
          {inReadingList ? (
            <button
              onClick={() => this.props.removeItem(this.props.item.uid)}
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
              onClick={() => this.props.addItem(this.props.item.uid)}
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
