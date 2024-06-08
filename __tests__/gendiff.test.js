import path from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import parseFile from '../src/parsers.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);

const runGenDiffTest = (file1Path, file2Path, expected) => {
  test(`gendiff ${path.extname(file1Path)} files`, () => {
    const filepath1 = getFixturePath(file1Path);
    const filepath2 = getFixturePath(file2Path);
    expect(genDiff(filepath1, filepath2)).toBe(expected);
  });
};

const expectedDiff = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

runGenDiffTest('json/file1.json', 'json/file2.json', expectedDiff);
runGenDiffTest('yaml/file1.yaml', 'yaml/file2.yaml', expectedDiff);
runGenDiffTest('yml/file1.yml', 'yml/file2.yml', expectedDiff);

test('gendiff fail', () => {
  expect(() => genDiff('', '')).toThrow();
});

test('parseFile unsupported format', () => {
  const unsupportedPath = getFixturePath('unsupported/file1.txt');
  expect(() => parseFile(unsupportedPath)).toThrow('Unsupported file format: .txt');
});
