import React, { Component } from 'react';

export default class ResultItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <li style={{ padding: '20px', border: '1px #663399 solid' }}>
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
      </li>
    );
  }
}
