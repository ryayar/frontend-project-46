import path from 'path';
import fs from 'fs';
import buildDiff from './buildDiff.js';
import getFormat from './formatters/index.js';
import getParsedData from './parsers.js';

const genDiff = (file1, file2, format = 'stylish') => {
  const data1 = fs.readFileSync(path.resolve(file1), 'utf-8');
  const data2 = fs.readFileSync(path.resolve(file2), 'utf-8');

  const ext1 = path.extname(file1);
  const ext2 = path.extname(file2);

  const obj1 = getParsedData(data1, ext1);
  const obj2 = getParsedData(data2, ext2);
  const diff = buildDiff(obj1, obj2);

  return getFormat(diff, format);
};

export default genDiff;
