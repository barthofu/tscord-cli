import { program } from 'commander'

import * as commands from './commands'

program
    .name('tscord-cli')
    .description('A CLI for TSCord')
    .version('0.0.1')

for (const command of Object.values(commands)) {
	program.addCommand(command)
}

program.parse(process.argv)