import { getPluginsFromMonorepo } from '@utils'
import { createCommand } from 'commander'

export default createCommand()

    .name('search')
    .description('search for a plugin')

    .argument('<query>', 'Query you want to search.')

    .action(async (query: string) => {
        
        const plugins = await getPluginsFromMonorepo()

        const results = plugins.filter(plugin => plugin.toLowerCase().includes(query.toLowerCase()))

        console.log(results)
    }
)
