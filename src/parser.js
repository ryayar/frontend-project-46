import path from 'path';
import fs from 'fs';

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

export default parseFile;
