import { repositories } from "@config"
import { getPluginFromMonorepo, logger } from "@utils"
import boxen from "boxen"
import chalk from "chalk"
import { createCommand } from "commander"

export default createCommand()

    .name('info')
    .description('get all info on a plugin')

    .argument('<name>', 'name of the plugin you want to get info on')

    .action(async (query: string) => {

        logger.newLine()
        
        const plugin = await getPluginFromMonorepo(query)

        if (plugin) {

            const pluginUrl = `https://github.com/${repositories.plugins.owner}/${repositories.plugins.repo}/tree/${repositories.plugins.branch}/${query}/`

            const message = boxen(
                `${chalk.bold('id:')} ${chalk.italic.greenBright(query)}\n` +
                `${chalk.bold('description:')} ${plugin.description}\n` +
                `${chalk.bold('author:')} ${plugin.author}\n` +
                `${chalk.bold('version:')} ${chalk.bgBlack(plugin.version)}\n` +
                `${chalk.bold('tscord required version:')} ${chalk.bgBlack(plugin.tscordRequiredVersion)}\n` +
                `${chalk.bold('link:')} ${chalk.gray(pluginUrl)}`,
                {
                    title: chalk.bold.greenBright(plugin.name),
                    titleAlignment: 'center',
                    padding: 1,
                    borderStyle: 'round',
                }
            )

            logger.log(message)
        }
        else logger.failure('Plugin not found.')
        
        logger.newLine()
    })
