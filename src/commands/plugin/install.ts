import { checkLocation } from "@middlewares"
import { downloadPluginFromMonorepo, getCurrentPackageManager, getLocalPlugin, getPackageJson, getPluginFromMonorepo, isUrl, logger } from "@utils"
import chalk from "chalk"
import { createCommand } from "commander"
import { resolve } from "path"
import { spawn } from "spawnise"
import semver from "semver"
import { repositories } from "@config"

export default createCommand()

    .name('install')
    .description('install a plugin')

    .argument('<name>', 'plugin name you want to install')

    .action(async (rawName: string) => {

        if (!await checkLocation()) return

        logger.newLine()
        logger.spinner.start(`Downloading plugin ${chalk.bold(rawName)}...`)
         
        // determine if its a link or a plugin name
        if (!isUrl(rawName)) {

            const version = rawName.split('@')[1] || 'latest'
            const name = rawName.split('@')[0]
                        
            const localPlugin = await getLocalPlugin(name)
            if (localPlugin) return logger.failure(`Plugin ${chalk.bold(name)} already installed.`)

            const remotePlugin = await getPluginFromMonorepo(name, version)

            if (remotePlugin) {

                const projectPackageJson = await getPackageJson()
                if (!semver.satisfies(semver.coerce(projectPackageJson.tscord.version)!, remotePlugin.tscordRequiredVersion)) return logger.failure(`Plugin ${chalk.bold(name)} requires tscord version ${chalk.bold(remotePlugin.tscordRequiredVersion)}, but you are using ${chalk.bold(projectPackageJson.tscord.version)}.`)

                // download the plugin from the official repo
                const result = await downloadPluginFromMonorepo(name, 'src/plugins', { ...repositories.plugins, branch: remotePlugin.commitHash || 'main' })
                if (!result) return logger.failure(`Failed to install ${chalk.bold(rawName)}`)

                // download dependencies
                logger.spinner.start('Installing plugin dependencies...')

                const packageManager = await getCurrentPackageManager()

                await spawn(packageManager, ['install'], {
                    env: process.env,
                    cwd: resolve() + `/src/plugins/${name}/`,
                    stdio: 'ignore'
                })

                if (result) logger.success(`Successfully installed ${rawName}`)

            } else logger.failure(`Plugin ${chalk.bold(`${name}@${version}`)} not found.`)

        } else {
            logger.failure('Not implemented yet.')
        }

    })
