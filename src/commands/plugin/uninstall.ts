import { getLocalPlugin, uninstallPlugin } from "@utils"
import { createCommand } from "commander"
import { rm } from "fs"
import { resolve } from "path"
import { promisify } from "util"

export default createCommand()

    .name('uninstall')
    .description('uninstall a plugin')

    .argument('<name>', 'Plugin name you want to uninstall.')

    .action(async (pluginName: string) => {

        const localPlugin = await getLocalPlugin(pluginName)

        if (localPlugin) {

            const success = await uninstallPlugin(pluginName)

            if (success) console.log(`Successfully uninstalled ${pluginName}`)
            else console.log(`Failed to uninstall ${pluginName}`)

        } else {
            console.error(`Plugin ${pluginName} does not exist locally.`)
        }
        
    }
)
