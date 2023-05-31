import database from '../database.json' assert { type: 'json' };
import { TerminalController } from './terminalController.js';

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, 'pt-BR')
