import { getPluginFromMonorepo } from "@utils"
import { createCommand } from "commander"

export default createCommand()

    .name('info')
    .description('info on a plugin')

    .argument('<name | url>', 'Plugin name or url you want to install.')

    .action(async (query: string) => {
        
        const plugin = await getPluginFromMonorepo(query)

        if (plugin) {
            console.log(plugin)
        } else {
            console.error('Plugin not found.')
        }

    }
)
