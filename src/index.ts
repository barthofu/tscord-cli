#!/usr/bin/env node

import { program } from "commander"

import { info } from "@config"
import { isInTSCordProject, logger } from "@utils"

import * as commands from "./commands"

export const verbose = (): boolean => program.opts().verbose || false

program
    .name(info.name)
    .description(info.description)
    .version(info.version)

    .option('-v, --verbose')

for (const command of Object.values(commands)) {
	program.addCommand(command)
}

async function main() {
    
    const inTSCordProject = await isInTSCordProject()
    if (!inTSCordProject) {
        logger.newLine()
        logger.failure('You are not in a TSCord project')
        return
    }
    
    program.parse(process.argv)
}

main()

