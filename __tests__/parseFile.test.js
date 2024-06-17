import { expect, test } from '@jest/globals';
import parseFile from '../src/parsers.js';
import { parseFileUnsupportedFormat } from '../__fixtures__/dataTest.js';
import { throwUnsupportedFileFormat } from '../__fixtures__/expectedTest.js';

test('parseFile unsupported format', () => {
  expect(() => parseFile(parseFileUnsupportedFormat.data, parseFileUnsupportedFormat.ext))
    .toThrow(throwUnsupportedFileFormat);
});
