import { getPluginFromMonorepo, isUrl } from "@utils"
import { createCommand } from "commander"
import { downloadPluginFromMonorepo } from "src/utils/download"

export default createCommand()

    .name('install')
    .description('install a plugin')

    .argument('<name | url>', 'Plugin name or url you want to install.')

    .action(async (query: string) => {
         
        // determine if its a link or a plugin name
        if (!isUrl(query)) {
                        
            const plugin = await getPluginFromMonorepo(query)

            if (plugin) {

                // download the plugin from the official repo
                const result = await downloadPluginFromMonorepo(query)

                if (result) {
                    console.log(`Successfully installed ${query}`)
                } else {
                    console.error(`Failed to install ${query}`)
                }

            } else {
                console.error(`Plugin ${query} not found.`)
            }

        } else {
            console.error('Not implemented yet.')
        }
    }
)
