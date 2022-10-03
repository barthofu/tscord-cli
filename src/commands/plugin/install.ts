import { checkLocation } from "@middlewares"
import { downloadPluginFromMonorepo, getLocalPlugin, getPluginFromMonorepo, isUrl, logger } from "@utils"
import chalk from "chalk"
import { createCommand } from "commander"

export default createCommand()

    .name('install')
    .description('install a plugin')

    .argument('<name>', 'plugin name or url you want to install')

    .action(async (query: string) => {

        if (!await checkLocation()) return

        logger.newLine()
        logger.spinner.start(`Installing plugin ${chalk.bold(query)}...`)
         
        // determine if its a link or a plugin name
        if (!isUrl(query)) {
                        
            const localPlugin = await getLocalPlugin(query)
            if (localPlugin) return logger.failure(`Plugin ${chalk.bold(query)} already installed.`)

            const remotePlugin = await getPluginFromMonorepo(query)

            if (remotePlugin) {

                // download the plugin from the official repo
                const result = await downloadPluginFromMonorepo(query)

                if (result) logger.success(`Successfully installed ${chalk.bold(query)}`)
                else logger.failure(`Failed to install ${chalk.bold(query)}`)

            } else logger.failure(`Plugin ${chalk.bold(query)} not found.`)

        } else {
            logger.failure('Not implemented yet.')
        }

    })
