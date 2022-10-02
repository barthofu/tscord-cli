import { getLocalPlugin, getPluginFromMonorepo, getPluginsFromMonorepo, logger } from "@utils"
import chalk from "chalk"
import { createCommand } from "commander"
import oneline from "oneline"

export default createCommand()

    .name('search')
    .description('search for a plugin')

    .argument('<query>', 'query you want to search')
    
    .option('-s, --short', 'speed up search command by not showing extra information on plugins')

    .action(async (query: string, options) => {

        logger.newLine()
        
        // get all plugins from the monorepo
        const plugins = await getPluginsFromMonorepo()

        // filter the plugins by the query
        const results = plugins.filter(plugin => plugin.toLowerCase().includes(query.toLowerCase()))

        if (results.length > 0) logger.log(chalk.underline(`Results for query '${chalk.italic.bold(query)}':\n`))
        else return logger.failure('No results found.')

        for (const pluginName of results) {

            if (!options.short) {

                const remotePlugin = await getPluginFromMonorepo(pluginName)
                
                if (remotePlugin) {

                    const localPlugin = await getLocalPlugin(pluginName)

                    const message = oneline`
                        ◦${localPlugin ? chalk.green(' [installed]') : ''}
                        ${chalk.bold.magenta(pluginName)}
                        (${remotePlugin.name} v${remotePlugin.version})
                        - ${chalk.gray.italic(remotePlugin.description)}
                    `

                    logger.log(message)
                }
                else logger.log(pluginName)

            } else {
                logger.log(pluginName)
            }
        }

        logger.newLine()
    }
)
