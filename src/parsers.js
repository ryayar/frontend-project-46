import yaml from 'js-yaml';

const getParsedData = (data, ext) => {
  switch (ext) {
    case '.json':
      return JSON.parse(data);
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    default:
      throw new Error(`Unsupported file format: ${ext}`);
  }
};

export default getParsedData;
