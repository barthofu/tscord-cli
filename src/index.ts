import { program } from "commander"

import packageJson from "../package.json"
import * as commands from "./commands"

program
    .name(packageJson.name)
    .description(packageJson.description)
    .version(packageJson.version)

for (const command of Object.values(commands)) {
	program.addCommand(command)
}

program.parse(process.argv)