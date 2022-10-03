#!/usr/bin/env node

import { program } from "commander"

import { info } from "@config"
import { checkLocation, checkVersion, checkVerbose } from "@middlewares"

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
        await checkVersion() &&
        await checkLocation(program) &&
        await checkVerbose(program)
    ) {

        program.parse(process.argv)
    }
}

run()

