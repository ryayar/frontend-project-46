import { expect, test } from '@jest/globals';
import stylish from '../src/formatters/stylish.js';
import { stylishUnknownNodeValue } from '../__fixtures__/dataTest.js';
import { throwStylishUnknownNodeValue } from '../__fixtures__/expectedTest.js';

test('Stylish unknown node value', () => {
  expect(() => stylish(stylishUnknownNodeValue)).toThrow(throwStylishUnknownNodeValue);
});
