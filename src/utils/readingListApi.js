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

const readAll = () => {
  return fetch('/.netlify/functions/reading-list').then(response => {
    console.log(response);
    return response.json();
  });
};

const inList = articleId => {
  return fetch(`/.netlify/functions/reading-list/${articleId}`).then(
    response => {
      if (response.statusCode === 200) {
        return true;
      }
      return false;
    }
  );
};

const remove = articleId => {
  return fetch(`/.netlify/functions/reading-list/${articleId}`, {
    method: 'DELETE',
  }).then(response => {
    if (response.statusCode === 200) {
      return true;
    }
    return false;
  });
};

export default {
  create: create,
  readAll: readAll,
  inList: inList,
  addItem: addItem,
  delete: remove,
};
