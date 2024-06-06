const _ = require('lodash');

const diff = (file1Data, file2Data) => {
  const keys = _.sortBy(_.union(_.keys(file1Data), _.keys(file2Data)));
  const diffLines = keys.map((key) => {
    if (_.has(file1Data, key) && _.has(file2Data, key)) {
      if (file1Data[key] === file2Data[key]) {
        return `    ${key}: ${file1Data[key]}`;
      }
      return [`  - ${key}: ${file1Data[key]}`, `  + ${key}: ${file2Data[key]}`];
    }
    if (_.has(file1Data, key)) {
      return `  - ${key}: ${file1Data[key]}`;
    }
    if (_.has(file2Data, key)) {
      return `  + ${key}: ${file2Data[key]}`;
    }
    return [];
  });
  
  return `{\n${_.flatten(diffLines).join('\n')}\n}`;
};

module.exports = diff;