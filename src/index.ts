#!/usr/bin/env node

import { program } from "commander"

import { info } from "@config"
import * as commands from "./commands"

program
    .name(info.name)
    .description(info.description)
    .version(info.version)

for (const command of Object.values(commands)) {
	program.addCommand(command)
}

program.parse(process.argv)