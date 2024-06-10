import _ from 'lodash';

const checkValue = (val) => {
  if (_.isString(val)) {
    return `'${val}'`;
  }
  if (_.isObject(val)) {
    return '[complex value]';
  }
  return val;
};

const addStr = {
  added: (dif, way) => `Property '${way}${dif.name}' was added with value: ${checkValue(dif.value)}`,
  deleted: (dif, way) => `Property '${way}${dif.name}' was removed`,
  updated: (dif, way) => `Property '${way}${dif.name}' was updated. From ${checkValue(dif.oldValue)} to ${checkValue(dif.newValue)}`,
};

const genDiff = (diff, way = '') => {
  const res = diff.map((dif) => {
    if (dif.type !== 'same' && dif.type !== 'nested') {
      return addStr[dif.type](dif, way);
    }
    if (dif.type === 'nested') {
      return genDiff(dif.value, `${way}${dif.name}.`);
    }
    return '';
  }).filter((val) => val !== '');

  return res.join('\n');
};

export default genDiff;
