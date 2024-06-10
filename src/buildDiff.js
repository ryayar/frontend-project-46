import _ from 'lodash';

const makeNode = (name, type, value, oldValue, newValue) => ({
  name,
  type,
  value,
  ...(oldValue !== undefined && { oldValue }),
  ...(newValue !== undefined && { newValue }),
});

const buildDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  return keys.map((key) => {
    if (!_.has(obj1, key)) return makeNode(key, 'added', obj2[key]);
    if (!_.has(obj2, key)) return makeNode(key, 'deleted', obj1[key]);
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return makeNode(key, 'nested', buildDiff(obj1[key], obj2[key]));
    }
    if (obj1[key] === obj2[key]) return makeNode(key, 'same', obj1[key]);
    return makeNode(key, 'updated', null, obj1[key], obj2[key]);
  });
};

export default buildDiff;
