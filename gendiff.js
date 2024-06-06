#!/usr/bin/env node

const { program } = require('commander');
const { version } = require('./package.json');

program
  .description('Compares two configuration files and shows a difference.')
  .version(version, '-V, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information');

program.parse(process.argv);

