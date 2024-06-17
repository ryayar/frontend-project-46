import { expect, test } from '@jest/globals';
import getFormat from '../src/formatters/index.js';
import { genDiffFormatJson, getFormatData } from '../__fixtures__/dataTest.js';
import { expectedJson, throwUnknownFormat } from '../__fixtures__/expectedTest.js';

test('genDiff format Json', () => {
  expect(getFormat(genDiffFormatJson.diff, genDiffFormatJson.format)).toBe(expectedJson);
});

test('throws for unknown format', () => {
  expect(() => getFormat(getFormatData.diff, getFormatData.format)).toThrow(throwUnknownFormat);
});
