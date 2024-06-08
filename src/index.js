import parseFile from './parsers.js';
import diffLines from './diff-lines.js';

const genDiff = (filepath1, filepath2) => {
  const file1Data = parseFile(filepath1);
  const file2Data = parseFile(filepath2);

  return diffLines(file1Data, file2Data);
};

export default genDiff;
