import { getPluginFromMonorepo, logger } from "@utils"
import chalk from "chalk"
import { createCommand } from "commander"
import boxen from "boxen"

export default createCommand()

    .name('info')
    .description('info on a plugin')

    .argument('<name | url>', 'Get all info on a plugin.')

    .action(async (query: string) => {

        logger.newLine()
        
        const plugin = await getPluginFromMonorepo(query)

        if (plugin) {

            const message = boxen(
                `${chalk.bold('id:')} ${chalk.italic(query)}\n` +
                `${chalk.bold('description:')} ${plugin.description}\n` +
                `${chalk.bold('author:')} ${plugin.author}\n` +
                `${chalk.bold('version:')} ${plugin.version}\n` +
                `${chalk.bold('tscord required version:')} ${plugin.tscordRequiredVersion}`,
                {
                    title: chalk.bold.magentaBright(plugin.name),
                    titleAlignment: 'center',
                    padding: 1,
                    borderStyle: 'round',
                    dimBorder: true
                }
            )

            logger.log(message)
        }
        else logger.failure('Plugin not found.')
        
        logger.newLine()
    }
)
