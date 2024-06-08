/* eslint-disable no-use-before-define */
import _ from 'lodash';

const getSpaces = (deep) => ' '.repeat(deep * 4 - 2);
const getAllFromObj = (obj, deep) => {
  const spaces = getSpaces(deep);
  const keys = _.sortBy(_.keys(obj));

  const res = keys.map((key) => {
    if (!_.isObject(obj[key])) {
      return `${spaces}  ${key}: ${obj[key]}`;
    }
    return `${spaces}  ${key}: {\n${getAllFromObj(obj[key], deep + 1)}\n${spaces}  }`;
  });
  return res.join('\n');
};

const checkVal = (val, deep) => {
  const spaces = getSpaces(deep);
  if (!_.isObject(val)) return val;
  if (Array.isArray(val)) return `{\n${genDiff(val, deep + 1)}\n${spaces}  }`;

  return `{\n${getAllFromObj(val, deep + 1)}\n${spaces}  }`;
};

const addStr = {
  same: (dif, spaces, deep) => `${spaces}  ${dif.name}: ${checkVal(dif.value, deep)}`,
  added: (dif, spaces, deep) => `${spaces}+ ${dif.name}: ${checkVal(dif.value, deep)}`,
  deleted: (dif, spaces, deep) => `${spaces}- ${dif.name}: ${checkVal(dif.value, deep)}`,
  updated: (dif, spaces, deep) => `${spaces}- ${dif.name}: ${checkVal(dif.oldValue, deep)}
${spaces}+ ${dif.name}: ${checkVal(dif.newValue, deep)}`,
  object: (dif, spaces, deep) => `${spaces}  ${dif.name}: ${checkVal(dif.value, deep)}`,
};

const genDiff = (diff, deep = 1) => {
  const spaces = getSpaces(deep);

  const res = diff.map((dif) => addStr[dif.status](dif, spaces, deep));
  return res.join('\n');
};

const makeRes = (diff) => `{\n${genDiff(diff)}\n}`;

export default makeRes;
