import { getPluginFromMonorepo, logger } from "@utils"
import { createCommand } from "commander"

export default createCommand()

    .name('info')
    .description('info on a plugin')

    .argument('<name | url>', 'Plugin name or url you want to install.')

    .action(async (query: string) => {

        logger.newLine()
        
        const plugin = await getPluginFromMonorepo(query)

        if (plugin) logger.log(JSON.stringify(plugin))
        else logger.failure('Plugin not found.')
        
        logger.newLine()
    }
)
