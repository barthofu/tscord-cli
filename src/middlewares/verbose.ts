import { logger } from "@utils"
import { Command } from "commander"

export const checkVerbose = (program: Command) => {

    program.parseOptions(process.argv)

    if (program.opts().verbose) logger.isVerbose = true

    return true
}