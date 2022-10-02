import { getPluginFromMonorepo, getLocalPlugin, uninstallPlugin, downloadPluginFromMonorepo } from "@utils"
import { createCommand } from "commander"

export default createCommand()

    .name('update')
    .description('update a plugin')

    .argument('<name>', 'Plugin name you want to update.')

    .action(async (pluginName: string) => {

        const remotePlugin = await getPluginFromMonorepo(pluginName)
        const localPlugin = await getLocalPlugin(pluginName)
        
        // guards
        if (!remotePlugin) return console.log(`Plugin ${pluginName} does not exist in the remote.`)
        else if (!localPlugin) return console.log(`Plugin ${pluginName} does not exist locally.`)
        else if (remotePlugin.version === localPlugin.version) return console.log(`Plugin ${pluginName} is already up to date.`)

        // update the plugin
        console.log(`Updating plugin ${pluginName}...`)

        const successfullyUninstalledPlugin = await uninstallPlugin(pluginName)
        if (!successfullyUninstalledPlugin) return console.log(`Failed to uninstall plugin ${pluginName}.`)
        
        const successfullyInstalledPlugin = await downloadPluginFromMonorepo(pluginName)
        if (!successfullyInstalledPlugin) return console.log(`Failed to install plugin ${pluginName}.`)

        console.log(`Successfully updated plugin ${pluginName}.`)
    }
)
