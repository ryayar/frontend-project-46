import _ from 'lodash';

const getKeys = (file0, file1) => _.uniq(_.concat(_.keys(file0), _.keys(file1)));

const buildDiff = (obj1, obj2) => {
  const keys = _.sortBy(getKeys(obj1, obj2));
  return keys.map((key) => {
    if (!_.has(obj1, key)) return { name: key, value: obj2[key], status: 'added' };
    if (!_.has(obj2, key)) return { name: key, value: obj1[key], status: 'deleted' };
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      return { name: key, value: buildDiff(obj1[key], obj2[key]), status: 'object' };
    }
    if (obj1[key] === obj2[key]) return { name: key, value: obj1[key], status: 'same' };
    return {
      name: key,
      oldValue: obj1[key],
      newValue: obj2[key],
      status: 'updated',
    };
  });
};

export default buildDiff;
