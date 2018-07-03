#!/usr/bin/env node

const program = require('commander');
const { prompt } = require('inquirer');

const {
  createDao
} = require('./logic');

const questions = [
  {
    type : 'input',
    name : 'daoName',
    message : 'Enter dao name ..'
  },
  {
    type : 'input',
    name : 'tokenName',
    message : 'Enter token name ..'
  },
  {
    type : 'input',
    name : 'tokenSymbol',
    message : 'Enter token symbol ..'
  },
  {
    type : 'expand',
    name: 'foundersFilePath',
    message : 'Founders file path (d(Default) for ./node_modules/@daostack/arc.js/migrations/founders.json)',
    choices: [
    {
      key: 'i',
      name: 'insert founders file path',
      value: 'edit'
    },
    {
      key: 'd',
      name: 'default',
      value: './node_modules/@daostack/arc.js/migrations/founders.json'
    }
    ]
  },
  {
    type: 'input',
    name: 'foundersFilePath',
    message: 'Enter founders file path',
    when: function(answers) {
      return answers.foundersFilePath == 'edit';
    }
  }
];

program
  .version('0.0.1')
  .description('daostack-cli')

program
  .command('createDao')
  .alias('c')
  .description('create a DAO')
  .action(() => {
    prompt(questions).then((answers) =>
      createDao(answers));
  });

// Assert that a VALID command is provided
console.log(process.argv.slice(2).length);
if (!process.argv.slice(2).length || !/[arudl]/.test(process.argv.slice(2))) {
  program.outputHelp();
  process.exit();
}
program.parse(process.argv)
