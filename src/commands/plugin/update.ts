import { createCommand } from "commander"

export default createCommand()

    .name('update')
    .description('update a plugin')

    .argument('<name>', 'Plugin name you want to update.')

    .action((pluginName: string) => {
        
        
    }
)
