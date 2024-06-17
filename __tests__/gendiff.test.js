import path from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';

import {
  expectedDiff,
  expectedNestJSON,
  expectedPlain,
} from '../__fixtures__/expectedTest.js';

import {
  filesJson,
  filesYaml,
  filesYml,
} from '../__fixtures__/dataTest.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);

const runGenDiffTest = (file1Path, file2Path, expected) => {
  test(`genDiff ${path.extname(file1Path)} files`, () => {
    const filepath1 = getFixturePath(file1Path);
    const filepath2 = getFixturePath(file2Path);
    expect(genDiff(filepath1, filepath2)).toBe(expected);
  });
};

const tests = [
  { file1: filesJson.file1, file2: filesJson.file2, expected: expectedDiff },
  { file1: filesYaml.file1, file2: filesYaml.file2, expected: expectedDiff },
  { file1: filesYml.file1, file2: filesYml.file2, expected: expectedDiff },
];

tests.forEach(({ file1, file2, expected }) => {
  runGenDiffTest(file1, file2, expected);
});

test('genDiff formatPlain', () => {
  const filepath1 = getFixturePath(filesJson.file3);
  const filepath2 = getFixturePath(filesJson.file4);
  expect(genDiff(filepath1, filepath2, 'plain')).toBe(expectedPlain);
});

test('genDiff nested JSON files', () => {
  const filepath1 = getFixturePath(filesJson.file3);
  const filepath2 = getFixturePath(filesJson.file4);
  expect(genDiff(filepath1, filepath2)).toBe(expectedNestJSON);
});

test('genDiff fail', () => {
  expect(() => genDiff('', '')).toThrow();
});
