import { checkLocation } from "@middlewares"
import { downloadPluginFromMonorepo, getCurrentPackageManager, getLocalPlugin, getPluginFromMonorepo, isUrl, logger } from "@utils"
import chalk from "chalk"
import { createCommand } from "commander"
import { resolve } from "path"
import { spawn } from "spawnise"

export default createCommand()

    .name('install')
    .description('install a plugin')

    .argument('<name>', 'plugin name you want to install')

    .action(async (name: string) => {

        if (!await checkLocation()) return

        logger.newLine()
        logger.spinner.start(`Downloading plugin ${chalk.bold(name)}...`)
         
        // determine if its a link or a plugin name
        if (!isUrl(name)) {
                        
            const localPlugin = await getLocalPlugin(name)
            if (localPlugin) return logger.failure(`Plugin ${chalk.bold(name)} already installed.`)

            const remotePlugin = await getPluginFromMonorepo(name)

            if (remotePlugin) {

                // download the plugin from the official repo
                const result = await downloadPluginFromMonorepo(name)
                if (!result) return logger.failure(`Failed to install ${chalk.bold(name)}`)

                // download dependencies
                logger.spinner.start('Installing plugin dependencies...')

                const packageManager = await getCurrentPackageManager()

                await spawn(packageManager, ['install'], {
                    env: process.env,
                    cwd: resolve() + `/src/plugins/${name}/`,
                    stdio: 'ignore'
                })

                if (result) logger.success(`Successfully installed ${chalk.bold(name)}`)

            } else logger.failure(`Plugin ${chalk.bold(name)} not found.`)

        } else {
            logger.failure('Not implemented yet.')
        }

    })
