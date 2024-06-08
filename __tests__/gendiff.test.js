import path from 'path';
import { test, expect } from '@jest/globals';
import genDiff from '../src/index.js';
import parseFile from '../src/parsers.js';
import formatStylish from '../src/stylish.js';

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

test('gendiff nested JSON files', () => {
  const filepath1 = getFixturePath('json/file3.json');
  const filepath2 = getFixturePath('json/file4.json');
  const expected = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

  expect(genDiff(filepath1, filepath2)).toBe(expected);
});

test('gendiff fail', () => {
  expect(() => genDiff('', '')).toThrow();
});

test('parseFile unsupported format', () => {
  const unsupportedPath = getFixturePath('unsupported/file1.txt');
  expect(() => parseFile(unsupportedPath)).toThrow('Unsupported file format: .txt');
});

test('formatStylish unknown node type', () => {
  const invalidNode = {
    type: 'unknown',
    key: 'someKey',
    value: 'someValue',
  };

  const tree = [invalidNode];

  expect(() => formatStylish(tree)).toThrow('Unknown type: unknown');
});
