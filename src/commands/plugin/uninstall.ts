import { createCommand } from 'commander'
import { rm } from 'fs'
import { resolve } from 'path'
import { promisify } from 'util'

export default createCommand()

    .name('uninstall')
    .description('uninstall a plugin')

    .argument('<name>', 'Plugin name you want to uninstall.')

    .action(async (pluginName: string) => {
        
        const path = resolve() + '/src/plugins/' + pluginName

        await promisify(rm)(path, { recursive: true })

        console.log(`Successfully uninstalled ${pluginName}`)
    }
)
