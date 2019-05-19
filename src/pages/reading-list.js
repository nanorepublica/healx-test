import React, { Component } from 'react';
import Layout from '../components/layout';
import SEO from '../components/seo';
import ResultItem from '../components/resultItem';

import readingListApi from '../utils/readingListApi';

export default class ReadingList extends Component {
  render() {
    return (
      <Layout>
        <SEO title="Reading List" keywords={['healx', 'reading', 'pubmed']} />
        <h1>Reading List</h1>
        <div style={{ margin: '100px auto' }}>
          {/* console.log(readingListApi.readAll())*/}
          {/*readingListApi.readAll().map(item => {
            console.log(item);
          })*/}
        </div>
      </Layout>
    );
  }
}
