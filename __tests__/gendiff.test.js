import path from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import parseFile from '../src/parsers.js';
import getFormat from '../src/formatters/index.js';
import stylish from '../src/formatters/stylish.js';

import {
  expectedDiff,
  expectedNestJSON,
  expectedPlain,
  expectedJson,
  throwStylishUnknownNodeValue,
  throwUnsupportedFileFormat,
  throwUnknownFormat,
} from '../__fixtures__/expectedTest.js';

import {
  filesJson,
  filesYaml,
  filesYml,
  genDiffFormatJson,
  getFormatData,
  parseFileUnsupportedFormat,
  stylishUnknownNodeValue,
} from '../__fixtures__/dataTest.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);

const runGenDiffTest = (file1Path, file2Path, expected) => {
  test(`genDiff ${path.extname(file1Path)} files`, () => {
    const filepath1 = getFixturePath(file1Path);
    const filepath2 = getFixturePath(file2Path);
    expect(genDiff(filepath1, filepath2)).toBe(expected);
  });
};

runGenDiffTest(filesJson.file1, filesJson.file2, expectedDiff);
runGenDiffTest(filesYaml.file1, filesYaml.file2, expectedDiff);
runGenDiffTest(filesYml.file1, filesYml.file2, expectedDiff);

test('genDiff formatPlain', () => {
  const filepath1 = getFixturePath(filesJson.file3);
  const filepath2 = getFixturePath(filesJson.file4);
  expect(genDiff(filepath1, filepath2, 'plain')).toBe(expectedPlain);
});

test('genDiff format Json', () => {
  expect(getFormat(genDiffFormatJson.diff, genDiffFormatJson.format)).toBe(expectedJson);
});

test('genDiff nested JSON files', () => {
  const filepath1 = getFixturePath(filesJson.file3);
  const filepath2 = getFixturePath(filesJson.file4);
  expect(genDiff(filepath1, filepath2)).toBe(expectedNestJSON);
});

test('genDiff fail', () => {
  expect(() => genDiff('', '')).toThrow();
});

test('Stylish unknown node value', () => {
  expect(() => stylish(stylishUnknownNodeValue)).toThrow(throwStylishUnknownNodeValue);
});

test('parseFile unsupported format', () => {
  expect(() => parseFile(parseFileUnsupportedFormat.data, parseFileUnsupportedFormat.ext))
    .toThrow(throwUnsupportedFileFormat);
});

test('throws for unknown format', () => {
  expect(() => getFormat(getFormatData.diff, getFormatData.format)).toThrow(throwUnknownFormat);
});
