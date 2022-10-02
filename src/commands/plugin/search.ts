import { getPluginsFromMonorepo } from "@utils"
import { createCommand } from "commander"

export default createCommand()

    .name('search')
    .description('search for a plugin')

    .argument('<query>', 'Query you want to search.')

    .action(async (query: string) => {
        
        // get all plugins from the monorepo
        const plugins = await getPluginsFromMonorepo()

        // filter the plugins by the query
        const results = plugins.filter(plugin => plugin.toLowerCase().includes(query.toLowerCase()))

        console.log(results)
    }
)
