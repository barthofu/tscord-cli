import { getPluginFromMonorepo, getVersionsRegistry, logger } from "@utils"
import { createCommand } from "commander"
import Table from 'cli-table'

export default createCommand()

    .name('versions')
    .description('list all the versions of a plugin')

    .argument('<name>', 'name of the plugin you want to get info on')

    .action(async (name: string) => {

        logger.newLine()
        logger.spinner.start('Fetching info...')

        const versionsRegistry = await getVersionsRegistry()
        if (!versionsRegistry) return logger.failure('Failed to get versions registry.')

        if (versionsRegistry[name]) {

            const versions = versionsRegistry[name]
            const table = new Table({
                head: ['Version', 'TSCord required version'],
            })

            for (const version of Object.keys(versions)) {

                const remotePluginInfo = await getPluginFromMonorepo(name, version)
                if (!remotePluginInfo) return logger.failure(`Failed to get info on plugin ${name}@${version}.`)
            
                table.push([version, remotePluginInfo.tscordRequiredVersion])
            }

            logger.log(table.toString())
            logger.newLine()
        }
        else logger.failure('Plugin not found.')
    })