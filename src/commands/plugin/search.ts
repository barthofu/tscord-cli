import { getLocalPlugin, getPluginFromMonorepo, getPluginsFromMonorepo, logger } from "@utils"
import chalk from "chalk"
import { createCommand } from "commander"
import oneline from "oneline"

export default createCommand()

    .name('search')
    .description('search for a plugin')

    .argument('<query>', 'query you want to search')
    
    .option('-s, --short', 'speed up search command by not showing extra information on plugins')
    .option('-l, --limit <number>', 'limit the number of results', '10')

    .action(async (query: string, options) => {

        logger.newLine()
        
        // get all plugins from the monorepo
        const plugins = await getPluginsFromMonorepo()

        // filter the plugins by the query
        const results = plugins.filter(plugin => plugin.toLowerCase().includes(query.toLowerCase()))

        if (results.length > 0) logger.log(chalk.underline(`Results for query '${chalk.italic.bold(query)}':\n`))
        else return logger.failure('No results found.')

        for (const pluginName of results.slice(0, Number(options.limit))) {

            const localPlugin = await getLocalPlugin(pluginName)
            const baseMessage = `◦${localPlugin ? chalk.green(' [installed]') : ''} ${chalk.bold.magenta(pluginName)}`

            if (!options.short) {

                const remotePlugin = await getPluginFromMonorepo(pluginName)
                
                if (remotePlugin) {

                    const message = oneline`
                        ${baseMessage}
                        (${remotePlugin.name} v${remotePlugin.version})
                        - ${chalk.gray.italic(remotePlugin.description)}
                    `

                    logger.log(message)
                }
                else logger.log(baseMessage)

            } else {
                logger.log(baseMessage)
            }
        }

        logger.newLine()
    }
)
