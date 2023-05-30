import Draftlog from 'draftlog';
import chalk from 'chalk';
import chalkTable from 'chalk-table';
import readline from 'readline';

import database from '../database.json' assert { type: 'json' };

Draftlog(console).addLineListener(process.stdin);

const options = {
  leftPad: 2,
  columns: [
    { field: 'id', name: chalk.cyan("ID")},
    { field: 'vehicles', name: chalk.magentaBright("Vehicles")},
    { field: 'kmTraveled', name: chalk.greenBright("Km Traveled")},
    { field: 'from', name: chalk.magenta("From")},
    { field: 'to', name: chalk.blue("To")},
  ]
}
;
const table = chalkTable(options, database);
const print = console.draft(table);

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
