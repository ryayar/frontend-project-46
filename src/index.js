import path from 'path';
import fs from 'fs';
import buildDiff from './buildDiff.js';
import getFormat from './formatters/index.js';
import getParsedData from './parsers.js';

const genDiff = (file0, file1, format = 'stylish') => {
  const data0 = fs.readFileSync(path.resolve(file0), 'utf-8');
  const data1 = fs.readFileSync(path.resolve(file1), 'utf-8');

  const ext0 = path.extname(file0);
  const ext1 = path.extname(file1);

  const obj0 = getParsedData(data0, ext0);
  const obj1 = getParsedData(data1, ext1);
  const diff = buildDiff(obj0, obj1);

  return getFormat(diff, format);
};

export default genDiff;
