import { repositories } from "@config"
import { getLocalPlugin, getPluginsFromMonorepo, logger } from "@utils"
import chalk from "chalk"
import { createCommand } from "commander"

export default createCommand()

    .name('list')
    .description('list all official plugins')

    .option('-i, --installed', 'list only installed plugins')
    .option('-l, --link', 'put the link of each plugin right to its name')

    .action(async (options) => {

        logger.newLine()

        const plugins = await getPluginsFromMonorepo()
        let pluginCount = 0

        for (const pluginName of plugins) {

            const localPlugin = await getLocalPlugin(pluginName)
            if (options.installed && !localPlugin) continue

            const pluginUrl = `https://github.com/${repositories.plugins.owner}/${repositories.plugins.repo}/tree/${repositories.plugins.branch}/plugins/${pluginName}/`

            const message = 
                `◦${localPlugin ? chalk.green(' [installed]') : ''} ` +
                chalk.bold.greenBright(pluginName) +
                `${options.link ? ` (${pluginUrl})` : '' }`

            logger.log(message)

            pluginCount++
        }

        logger.newLine()
        logger.log(chalk.gray.italic(`Found ${chalk.bold(pluginCount)} plugins.`))
        logger.newLine()
        
    })
