const create = data => {
  return fetch('/.netlify/functions/reading-list', {
    body: JSON.stringify(data),
    method: 'POST',
  }).then(response => {
    return response.json();
  });
};

const addItem = articleId => {
  return create({
    articleId: articleId,
  });
};

const update = (listId, data) => {
  return fetch(`/.netlify/functions/todos-update/${listId}`, {
    body: JSON.stringify(data),
    method: 'POST',
  }).then(response => {
    return response.json();
  });
};

const updateList = (listId, readingList) => {
  return update(listId, {
    readingList: readingList,
  });
};

const readAll = () => {
  return fetch('/.netlify/functions/reading-list').then(response => {
    if (response.status === 200) {
      return response.json();
    }
  });
};

const inList = articleId => {
  return readAll().then(myJson => {
    if (myJson === undefined) {
      return false;
    }
    const articles = myJson.filter(item => item.data.articleId === articleId);
    // Return true/false based on the length of the array
    return Boolean(articles.length);
  });
};

const remove = articleId => {
  // get all of them, then get the actual id of the article in the db.
  // then call delete
  return readAll().then(myJson => {
    const articleToDelete = myJson.filter(
      item => item.data.articleId === articleId
    );
    if (articleToDelete.length > 0) {
      return articleToDelete.map(item => {
        fetch(`/.netlify/functions/reading-list/${item.ref['@ref'].id}`, {
          method: 'DELETE',
        }).then(response => {
          if (response.status === 200) {
            return true;
          }
          return false;
        });
      });
    }
  });
};

export default {
  create: create,
  readAll: readAll,
  inList: inList,
  addItem: addItem,
  delete: remove,
  updateList: updateList,
};
