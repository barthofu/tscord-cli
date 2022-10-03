import { isInTSCordProject, logger } from "@utils"

/**
 * Check if the user is in a TSCord project when executing a CLI command.
 */
export const checkLocation = async (): Promise<boolean> => {

    const inTSCordProject = await isInTSCordProject()
    if (!inTSCordProject) {
        logger.newLine()
        logger.failure('You are not in a TSCord project')
        return false
    }

    return true
}