import path from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import parseFile from '../src/parsers.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);

test('gendiff flat JSON files', () => {
  const filepath1 = getFixturePath('json/file1.json');
  const filepath2 = getFixturePath('json/file2.json');
  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(genDiff(filepath1, filepath2)).toBe(expected);
});

test('gendiff flat YAML files', () => {
  const filepath1 = getFixturePath('yaml/file1.yaml');
  const filepath2 = getFixturePath('yaml/file2.yaml');
  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(genDiff(filepath1, filepath2)).toBe(expected);
});

test('gendiff flat YML files', () => {
  const filepath1 = getFixturePath('yml/file1.yml');
  const filepath2 = getFixturePath('yml/file2.yml');
  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(genDiff(filepath1, filepath2)).toBe(expected);
});

test('gendiff missing keys', () => {
  const filepath1 = getFixturePath('json/file3.json');
  const filepath2 = getFixturePath('json/file4.json');
  const expected = `{
  - follow: false
    host: hexlet.io
  + verbose: true
}`;

  expect(genDiff(filepath1, filepath2)).toBe(expected);
});

test('gendiff fail', () => {
  expect(() => genDiff('', '')).toThrow();
});

test('parseFile unsupported format', () => {
  const filepath = getFixturePath('unsupported/file1.txt');
  expect(() => parseFile(filepath)).toThrow('Unsupported file format: .txt');
});
