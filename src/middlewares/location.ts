import { isInTSCordProject, logger } from "@utils"
import { Command } from "commander"

const preventedCommands = ['plugin', 'generate']

/**
 * Check if the user is in a TSCord project when executing a CLI command.
 */
export const checkLocation = async (program: Command): Promise<boolean> => {

    const inTSCordProject = await isInTSCordProject()
    const command = program.parseOptions(process.argv).operands.slice(-1)[0]

    if (!inTSCordProject && preventedCommands.includes(command)) {
        logger.newLine()
        logger.failure('You are not in a TSCord project')
        return false
    }

    return true
}