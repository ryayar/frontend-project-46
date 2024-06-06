#!/usr/bin/env node

const { Command } = require('commander');
const { version } = require('./package.json');
const parseFile = require('./parser');

const program = new Command();

const genDiff = (filepath1, filepath2) => {
  const file1Data = parseFile(filepath1);
  const file2Data = parseFile(filepath2);
  
  console.log('File1 data:', file1Data);
  console.log('File2 data:', file2Data);
};

program
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.');

program
  .version(version, '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format');

program
  .action((filepath1, filepath2) => {
    genDiff(filepath1, filepath2);
  })

program.parse(process.argv);
