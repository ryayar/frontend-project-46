import plain from './plain.js';
import stylish from './stylish.js';

const getFormat = (diff, format) => {
  switch (format) {
    case 'stylish':
      return stylish(diff);
    case 'plain':
      return plain(diff);
    default:
      throw new Error(`Unavailing format - "${format}"`);
  }
};

export default getFormat;
