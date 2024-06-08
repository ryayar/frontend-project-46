import _ from 'lodash';

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return `${value}`;
  }

  const indent = ' '.repeat(depth * 4);
  const closingIndent = ' '.repeat((depth - 1) * 4);
  const lines = Object.entries(value)
    .map(([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`);
  return `{\n${lines.join('\n')}\n${closingIndent}}`;
};

const formatStylish = (diff, depth = 1) => {
  const indent = ' '.repeat(depth * 4 - 2);
  const closingIndent = ' '.repeat((depth - 1) * 4);

  const lines = diff.map((node) => {
    switch (node.type) {
      case 'added':
        return `${indent}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'removed':
        return `${indent}- ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'changed':
        return [
          `${indent}- ${node.key}: ${stringify(node.value1, depth + 1)}`,
          `${indent}+ ${node.key}: ${stringify(node.value2, depth + 1)}`,
        ].join('\n');
      case 'unchanged':
        return `${indent}  ${node.key}: ${stringify(node.value, depth + 1)}`;
      case 'nested':
        return `${indent}  ${node.key}: ${formatStylish(node.children, depth + 1)}`;
      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });

  return `{\n${lines.join('\n')}\n${closingIndent}}`;
};

export default formatStylish;
