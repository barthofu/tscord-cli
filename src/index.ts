#!/usr/bin/env node

import { program } from "commander"

import { info } from "@config"
import { checkVerbose, checkVersion, deprecation } from "@middlewares"

import * as commands from "./commands"

program
    .name(info.name)
    .description(info.description)
    .version(info.version)

    .option('-v, --verbose')

for (const command of Object.values(commands)) {
	program.addCommand(command)
}

async function run() {
    
    if (
        deprecation() &&
        checkVerbose(program)
    ) {

        program.parse(process.argv)
    }
}

run()

