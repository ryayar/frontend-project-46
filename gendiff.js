#!/usr/bin/env node

const { Command } = require('commander');
const { version } = require('./package.json');

const program = new Command();

program
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.');

program
  .version(version, '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format');
  

program.parse(process.argv);

