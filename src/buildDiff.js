import _ from 'lodash';

const buildDiff = (file1Data, file2Data) => {
  const keys = _.sortBy(_.union(_.keys(file1Data), _.keys(file2Data)));

  return keys.map((key) => {
    if (!_.has(file1Data, key)) {
      return { key, type: 'added', value: file2Data[key] };
    }
    if (!_.has(file2Data, key)) {
      return { key, type: 'removed', value: file1Data[key] };
    }
    if (_.isObject(file1Data[key]) && _.isObject(file2Data[key])) {
      return { key, type: 'nested', children: buildDiff(file1Data[key], file2Data[key]) };
    }
    if (file1Data[key] !== file2Data[key]) {
      return {
        key, type: 'changed', value1: file1Data[key], value2: file2Data[key],
      };
    }
    return { key, type: 'unchanged', value: file1Data[key] };
  });
};

export default buildDiff;
