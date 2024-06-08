import path from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import parseFile from '../src/parsers.js';

const getFixturePath = (filename) => path.join('__fixtures__', filename);

test('gendiff flat JSON files', () => {
  const jsonPath1 = getFixturePath('json/file1.json');
  const jsonPath2 = getFixturePath('json/file2.json');
  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(genDiff(jsonPath1, jsonPath2)).toBe(expected);
});

test('gendiff flat YAML files', () => {
  const yamlPath1 = getFixturePath('yaml/file1.yaml');
  const yamlPath2 = getFixturePath('yaml/file2.yaml');
  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(genDiff(yamlPath1, yamlPath2)).toBe(expected);
});

test('gendiff flat YML files', () => {
  const ymlPath1 = getFixturePath('yml/file1.yml');
  const ymlPath2 = getFixturePath('yml/file2.yml');
  const expected = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

  expect(genDiff(ymlPath1, ymlPath2)).toBe(expected);
});

test('gendiff fail', () => {
  expect(() => genDiff('', '')).toThrow();
});

test('parseFile unsupported format', () => {
  const unsupportedPath = getFixturePath('unsupported/file1.txt');
  expect(() => parseFile(unsupportedPath)).toThrow('Unsupported file format: .txt');
});
