import React, { Component } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import ResultList from '../components/results';

import readingListApi from '../utils/readingListApi';

export default class ReadingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      readingList: [],
    };
  }

  componentDidMount() {
    // get the list of UIDs from the backend to pass to the list to generate
    this.userId = window.localStorage.getItem('userID');
    readingListApi.read(this.userId).then(json => {
      this.setState({ readingList: json.data.readingList });
    });
  }

  render() {
    return (
      <Layout>
        <SEO title="Reading List" keywords={['healx', 'reading', 'pubmed']} />
        <h1>Reading List</h1>
        <div style={{ margin: '100px auto' }}>
          <ResultList results={this.state.readingList} isSavedList={true} />
        </div>
      </Layout>
    );
  }
}
