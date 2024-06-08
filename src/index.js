import parseFile from './parsers.js';
import buildDiff from './buildDiff.js';
import formatStylish from './stylish.js';

const genDiff = (filepath1, filepath2) => {
  const file1Data = parseFile(filepath1);
  const file2Data = parseFile(filepath2);

  const diff = buildDiff(file1Data, file2Data);
  return formatStylish(diff);
};

export default genDiff;
