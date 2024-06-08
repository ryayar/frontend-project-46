import _ from 'lodash';

const getKeys = (file0, file1) => _.uniq(_.concat(_.keys(file0), _.keys(file1)));

const buildDiff = (obj0, obj1) => {
  const keys = _.sortBy(getKeys(obj0, obj1));
  const treePart = keys.map((key) => {
    if (!_.has(obj0, key)) return { name: key, value: obj1[key], status: 'added' };
    if (!_.has(obj1, key)) return { name: key, value: obj0[key], status: 'deleted' };
    if (_.isObject(obj0[key]) && _.isObject(obj1[key])) {
      return { name: key, value: buildDiff(obj0[key], obj1[key]), status: 'object' };
    }
    if (obj0[key] === obj1[key]) return { name: key, value: obj0[key], status: 'same' };
    return {
      name: key,
      oldValue: obj0[key],
      newValue: obj1[key],
      status: 'updated',
    };
  });

  return treePart;
};

export default buildDiff;
