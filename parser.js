const path = require('path');
const fs = require('fs');

const parseFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const fileContent = fs.readFileSync(fullPath, 'utf-8');
  const ext = path.extname(filepath);

  switch (ext) {
    case '.json':
      return JSON.parse(fileContent);
    default:
      throw new Error(`Unsupported file format: ${ext}`);
  }
};

module.exports = parseFile;