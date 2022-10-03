import { getLocalPlugin, logger, uninstallPlugin } from "@utils"
import chalk from "chalk"
import { createCommand } from "commander"
import { rm } from "fs"
import { resolve } from "path"
import { promisify } from "util"

export default createCommand()

    .name('uninstall')
    .description('uninstall a plugin')

    .argument('<name>', 'plugin name you want to uninstall')

    .action(async (pluginName: string) => {

        logger.newLine()
        logger.spinner.start(`Uninstalling plugin ${chalk.bold(pluginName)}...`)

        const localPlugin = await getLocalPlugin(pluginName)

        if (localPlugin) {

            const success = await uninstallPlugin(pluginName)

            if (success) logger.success(`Successfully uninstalled ${chalk.bold(pluginName)}`)
            else logger.failure(`Failed to uninstall ${chalk.bold(pluginName)}`)

        } else {
            logger.failure(`Plugin ${chalk.bold(pluginName)} does not exist locally.`)
        }
        
    }
)
