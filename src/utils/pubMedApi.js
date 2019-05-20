var baseSearchUrl = new URL(
  'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi'
);
var baseSummaryUrl = new URL(
  'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi'
);

const updateURL = () => {
  var params = {
    db: 'pubmed',
    retmax: '20',
    retmode: 'json',
    term: this.state.term,
  };
  baseSearchUrl.search = new URLSearchParams(params);
  this.setState({ url: baseSearchUrl }, doSearch);
};

const doSearch = () => {
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
      getResultDetails(resultList);
    });
};

const getResultDetails = (resultList, cb) => {
  var params = {
    db: 'pubmed',
    retmode: 'json',
    id: resultList.join(','),
  };
  baseSummaryUrl.search = new URLSearchParams(params);
  fetch(baseSummaryUrl)
    .then(function(response) {
      return response.json();
    })
    .then(cb);
};

export default {
  getResultDetails: getResultDetails,
};
