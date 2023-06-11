import database from '../database.json' assert { type: 'json' };
import { TerminalController } from './terminalController.js';
import { Person } from './person.js';

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, 'pt-BR')

async function mainLoop() {
  try {
    const answer = await terminalController.question('input new data: ');

    if(answer === ':q') {
      terminalController.closeTerminal();
      console.log('process closed');
      return;
    }

    database.push(Person.generateInstanceFromString(answer).formatted('pt-BR'));

    return mainLoop();

  } catch (e) {
    console.error("didn't work", e);
    return mainLoop();
  }
}

await mainLoop();