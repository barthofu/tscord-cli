import { repositories } from "@config"
import { getPackageJson, getPluginFromMonorepo, logger } from "@utils"
import boxen from "boxen"
import chalk from "chalk"
import { createCommand } from "commander"
import semver from "semver"

export default createCommand()

    .name('info')
    .description('get all info on a plugin')

    .argument('<name>', 'name of the plugin you want to get info on')

    .action(async (query: string) => {

        logger.newLine()

        const version = query.split('@')[1] || 'latest'
        const name = query.split('@')[0]
        
        const remotePlugin = await getPluginFromMonorepo(name, version)

        if (remotePlugin) {

            const pluginUrl = `https://github.com/${repositories.plugins.owner}/${repositories.plugins.repo}/tree/${repositories.plugins.branch}/${name}/`

            const message = boxen(
                `${chalk.bold('id:')} ${chalk.italic.greenBright(name)}\n` +
                `${chalk.bold('description:')} ${remotePlugin.description}\n` +
                `${chalk.bold('author:')} ${remotePlugin.author}\n` +
                `${chalk.bold('version:')} ${chalk.bgBlack(remotePlugin.version)}\n` +
                `${chalk.bold('tscord required version:')} ${chalk.bgBlack(remotePlugin.tscordRequiredVersion)}\n` +
                `${chalk.bold('link:')} ${chalk.gray(pluginUrl)}`,
                {
                    title: chalk.bold.greenBright(remotePlugin.name),
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
