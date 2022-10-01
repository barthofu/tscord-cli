import { createCommand } from "commander"

export default createCommand()

    .name('uninstall')
    .description('uninstall a plugin')

    .argument('<name>', 'Plugin name you want to uninstall.')

    .action((pluginName: string) => {
        
        
    }
)
