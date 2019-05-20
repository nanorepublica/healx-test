import React, { Component } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import ResultList from '../components/results';

import readingListApi from '../utils/readingListApi';
import pubMedApi from '../utils/pubMedApi';

export default class ReadingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readingList: { uids: [] },
    };
  }

  componentDidMount() {
    var self = this;
    // get the list of UIDs from the backend to pass to the list to generate
    readingListApi.readAll().then(data => {
      const set = new Set(data.map(item => item.data.articleId));
      const list = Array.from(set);
      pubMedApi.getResultDetails(list, function(json) {
        self.setState({ readingList: json.result });
      });
    });
  }

  render() {
    return (
      <Layout>
        <SEO title="Reading List" keywords={['healx', 'reading', 'pubmed']} />
        <h1>Reading List</h1>
        <div style={{ margin: '100px auto' }}>
          <ResultList results={this.state.readingList} />
        </div>
      </Layout>
    );
  }
}
