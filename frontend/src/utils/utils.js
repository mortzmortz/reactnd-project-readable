import { distanceInWords } from 'date-fns';

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

export function getRelativeDate(timestamp) {
  return distanceInWords(timestamp, new Date());
}

export const sortByKey = (list, sortKey) =>
  list.sort((a, b) => a[sortKey] < b[sortKey]);
