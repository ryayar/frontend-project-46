import _ from 'lodash';

const makeNode = (name, type, beforeValue = null, afterValue = null, children = null) => ({
  name,
  type,
  beforeValue,
  afterValue,
  children,
});

const buildDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  return keys.map((key) => {
    if (!_.has(obj1, key)) {
      return makeNode(key, 'added', null, obj2[key]);
    }
    if (!_.has(obj2, key)) {
      return makeNode(key, 'deleted', obj1[key]);
    }
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return makeNode(key, 'nested', null, null, buildDiff(obj1[key], obj2[key]));
    }
    if (obj1[key] === obj2[key]) {
      return makeNode(key, 'same', obj1[key]);
    }
    return makeNode(key, 'updated', obj1[key], obj2[key]);
  });
};

export default buildDiff;
