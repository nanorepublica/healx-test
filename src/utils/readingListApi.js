const create = data => {
  return fetch('/.netlify/functions/reading-list', {
    body: JSON.stringify(data),
    method: 'POST',
  }).then(response => {
    return response.json();
  });
};

const update = (listId, data) => {
  return fetch(`/.netlify/functions/reading-list/${listId}`, {
    body: JSON.stringify(data),
    method: 'PUT',
  }).then(response => {
    return response.json();
  });
};

const updateList = (listId, readingList) => {
  const data = {
    readingList: readingList,
  };
  if (listId === null) {
    return create(data);
  } else {
    return update(listId, data);
  }
};

const read = articleId => {
  return fetch(`/.netlify/functions/reading-list/${articleId}`).then(
    response => {
      if (response.status === 200) {
        return response.json();
      }
    }
  );
};

export default {
  create: create,
  read: read,
  updateList: updateList,
};
