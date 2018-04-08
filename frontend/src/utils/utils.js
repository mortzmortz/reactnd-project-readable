export function normalizeById(posts) {
  return posts.reduce((acc, post) => {
    acc[post.id] = post;
    return acc;
  }, {});
}

export function normalize(list, prevState, asKey = 'id') {
  let nextState = { ...prevState };
  list.forEach(post => {
    const key = post[asKey];
    nextState[key] = post;
  });
  return nextState;
}
