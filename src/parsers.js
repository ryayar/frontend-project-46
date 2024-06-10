import yaml from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.load,
  '.yaml': yaml.load,
};

const getParsedData = (data, ext) => {
  const parse = parsers[ext];
  if (!parse) {
    throw new Error(`Unsupported file format: ${ext}`);
  }
  return parse(data);
};

export default getParsedData;
