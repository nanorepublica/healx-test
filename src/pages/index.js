import React from 'react';
// import { Link } from "gatsby"

import Layout from '../components/layout';
import SEO from '../components/seo';
import ResultList from '../components/results';
import SearchBar from '../components/searchBar';

class IndexPage extends React.Component {
  constructor() {
    super();
    this.updateSearchTerm = this.updateSearchTerm.bind(this);
    this.baseSearchUrl = new URL(
      'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi'
    );
    this.baseSummaryUrl = new URL(
      'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi'
    );

    this.state = {
      term: '',
      url: this.baseSearchUrl,
      resultCount: 0,
      resultList: { uids: [] },
      offset: 0,
    };
  }

  updateSearchTerm(value) {
    this.setState(
      { term: value, resultList: { uids: [] }, resultCount: 0 },
      this.updateURL
    );
  }

  updateURL() {
    var params = {
      db: 'pubmed',
      retmax: '20',
      retmode: 'json',
      term: this.state.term,
    };
    this.baseSearchUrl.search = new URLSearchParams(params);
    this.setState({ url: this.baseSearchUrl }, this.doSearch);
  }

  doSearch() {
    var self = this;
    console.log(`fetching search from ${this.state.url.href}`);
    fetch(this.state.url)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        if (myJson.esearchresult.hasOwnProperty('count')) {
          self.setState({
            count: myJson.esearchresult.count,
          });
          return myJson.esearchresult.idlist;
        }
        return [];
      })
      .then(function(resultList) {
        self.getResultDetails(resultList);
      });
  }

  getResultDetails(resultList) {
    var self = this;
    var params = {
      db: 'pubmed',
      retmode: 'json',
      id: resultList.join(','),
    };
    this.baseSummaryUrl.search = new URLSearchParams(params);
    fetch(this.baseSummaryUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        self.setState({ resultList: json.result });
      });
  }

  render() {
    return (
      <Layout>
        <SEO title="Home" keywords={['healx', 'search', 'pubmed']} />
        <h1>Search</h1>
        {/* Search Input */}
        <div style={{ margin: '100px auto' }}>
          <SearchBar updateSearchTerm={this.updateSearchTerm} />

          {/* Search Results Summary */}
          <div style={{ margin: 'auto', width: '80%', paddingTop: '40px' }}>
            {this.state.term ? (
              <p>
                Showing {this.state.resultList.uids.length} of{' '}
                {this.state.count} results for {this.state.term}.
              </p>
            ) : (
              <p />
            )}
          </div>

          {/* Search Result List */}
          <ResultList results={this.state.resultList} />
        </div>
      </Layout>
    );
  }
}

export default IndexPage;
