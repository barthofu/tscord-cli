import { checkLocation } from "@middlewares"
import { downloadPluginFromMonorepo, getLocalPlugin, getPackageJson, getPluginFromMonorepo, logger, uninstallPlugin } from "@utils"
import chalk from "chalk"
import { createCommand } from "commander"
import semver from "semver"

export default createCommand()

    .name('update')
    .description('update a plugin')

    .argument('<name>', 'plugin name you want to update to its latest version')

    .action(async (name: string) => {

        if (!await checkLocation()) return

        logger.newLine()
        logger.spinner.start(`Updating plugin ${chalk.bold(name)}...`)

        const remotePlugin = await getPluginFromMonorepo(name)
        const localPlugin = await getLocalPlugin(name)
        const projectPackageJson = await getPackageJson()
        
        // guards
        if (!remotePlugin) return logger.failure(`Plugin ${chalk.bold(name)} does not exist in the remote.`)
        else if (!localPlugin) return logger.failure(`Plugin ${chalk.bold(name)} does not exist locally.`)
        else if (remotePlugin.version === localPlugin.version) return logger.failure(`Plugin ${chalk.bold(name)} is already up to date.`)
        else if (!semver.satisfies(semver.coerce(projectPackageJson.tscord.version)!, remotePlugin.tscordRequiredVersion)) return logger.failure(`Plugin ${chalk.bold(`${name}@${remotePlugin.version}`)} requires tscord version ${chalk.bold(remotePlugin.tscordRequiredVersion)}, but you are using ${chalk.bold(projectPackageJson.tscord.version)}.`)

        // update the plugin
        const successfullyUninstalledPlugin = await uninstallPlugin(name)
        if (!successfullyUninstalledPlugin) return logger.failure(`Failed to uninstall plugin ${chalk.bold(name)}.`)
        
        const successfullyInstalledPlugin = await downloadPluginFromMonorepo(name)
        if (!successfullyInstalledPlugin) return logger.failure(`Failed to install plugin ${chalk.bold(name)}.`)

        logger.success(`Successfully updated plugin ${chalk.bold(name)}.`)
    })
