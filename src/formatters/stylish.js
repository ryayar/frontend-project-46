import _ from 'lodash';

const checkVal = (propValue, depth = 0) => {
  const indent = '    '.repeat(depth);

  if (!_.isObject(propValue)) {
    return propValue;
  }
  const entries = Object.entries(propValue);
  const result = entries.map(([key, value]) => `    ${indent}${key}: ${checkVal(value, depth + 1)}`);

  return [
    '{',
    ...result,
    `${indent}}`,
  ].join('\n');
};

const makeRes = (diff, depth = 0) => {
  const spaces = '    '.repeat(depth);
  const result = diff.flatMap((dif) => {
    switch (dif.type) {
      case 'same':
        return `  ${spaces}  ${dif.name}: ${checkVal(dif.beforeValue, depth + 1)}`;
      case 'added':
        return `  ${spaces}+ ${dif.name}: ${checkVal(dif.afterValue, depth + 1)}`;
      case 'deleted':
        return `  ${spaces}- ${dif.name}: ${checkVal(dif.beforeValue, depth + 1)}`;
      case 'updated':
        return [
          `  ${spaces}- ${dif.name}: ${checkVal(dif.beforeValue, depth + 1)}`,
          `  ${spaces}+ ${dif.name}: ${checkVal(dif.afterValue, depth + 1)}`,
        ];
      case 'nested':
        return `  ${spaces}  ${dif.name}: ${makeRes(dif.children, depth + 1)}`;
      default:
        throw new Error('Unknown node type');
    }
  });

  return [
    '{',
    ...result,
    `${spaces}}`,
  ].join('\n');
};

export default makeRes;
