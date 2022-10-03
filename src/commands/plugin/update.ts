import { checkLocation } from "@middlewares"
import { downloadPluginFromMonorepo, getLocalPlugin, getPluginFromMonorepo, logger, uninstallPlugin } from "@utils"
import chalk from "chalk"
import { createCommand } from "commander"

export default createCommand()

    .name('update')
    .description('update a plugin')

    .argument('<name>', 'plugin name you want to update')

    .action(async (pluginName: string) => {

        if (!await checkLocation()) return

        logger.newLine()
        logger.spinner.start(`Updating plugin ${chalk.bold(pluginName)}...`)

        const remotePlugin = await getPluginFromMonorepo(pluginName)
        const localPlugin = await getLocalPlugin(pluginName)
        
        // guards
        if (!remotePlugin) return logger.failure(`Plugin ${chalk.bold(pluginName)} does not exist in the remote.`)
        else if (!localPlugin) return logger.failure(`Plugin ${chalk.bold(pluginName)} does not exist locally.`)
        else if (remotePlugin.version === localPlugin.version) return logger.failure(`Plugin ${chalk.bold(pluginName)} is already up to date.`)

        // update the plugin
        const successfullyUninstalledPlugin = await uninstallPlugin(pluginName)
        if (!successfullyUninstalledPlugin) return logger.failure(`Failed to uninstall plugin ${chalk.bold(pluginName)}.`)
        
        const successfullyInstalledPlugin = await downloadPluginFromMonorepo(pluginName)
        if (!successfullyInstalledPlugin) return logger.failure(`Failed to install plugin ${chalk.bold(pluginName)}.`)

        logger.success(`Successfully updated plugin ${chalk.bold(pluginName)}.`)
    })
