import { getPluginFromMonorepo, isUrl } from "@utils"
import { createCommand } from "commander"

export default createCommand()

    .name('install')
    .description('install a plugin')

    .argument('<name | url>', 'Plugin name or url you want to install.')

    .action(async (query: string) => {
         
        // 1. determine if its a link or a plugin name
        if (!isUrl(query)) {
            
            // 2. if its a plugin name
            
            const plugin = await getPluginFromMonorepo(query)

            if (plugin) {

                // 3. download the plugin from the official repo

            } else {
                console.error(`Plugin ${query} not found.`)
            }

        }
    }
)
