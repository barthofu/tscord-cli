import { getLocalPlugin, getPluginFromMonorepo, getPluginsFromMonorepo } from "@utils"
import chalk from "chalk"
import { createCommand } from "commander"
import oneline from "oneline"

export default createCommand()

    .name('search')
    .description('search for a plugin')

    .argument('<query>', 'query you want to search')
    
    .option('-s, --short', 'speed up search command by not showing extra information on plugins')

    .action(async (query: string, options) => {
        
        // get all plugins from the monorepo
        const plugins = await getPluginsFromMonorepo()

        // filter the plugins by the query
        const results = plugins.filter(plugin => plugin.toLowerCase().includes(query.toLowerCase()))

        if (results.length > 0) console.log(chalk.underline(`\nResults for query '${chalk.italic.bold(query)}':\n`))
        else console.log('\nNo results found.')

        for (const pluginName of results) {

            if (!options.short) {

                const remotePlugin = await getPluginFromMonorepo(pluginName)
                
                if (remotePlugin) {

                    const localPlugin = await getLocalPlugin(pluginName)

                    const message = oneline`
                        ◦${localPlugin ? chalk.green(' [installed]') : ''}
                        ${chalk.bold(pluginName)}
                        (${chalk.magenta(remotePlugin.version)})
                        - ${chalk.gray.italic(remotePlugin.description)}
                    `
                    console.log(message)
                }
                else console.log(pluginName)

            } else {
                console.log(pluginName)
            }
        }

        console.log('')

    }
)
