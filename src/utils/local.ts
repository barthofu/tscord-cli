import { existsSync, promises as fs } from "fs"
import { resolve } from "path"

export const getLocalPlugin = async (pluginName: string): Promise<PluginConfig | null> => {

    const pluginPath = getPathOfPlugin(pluginName)

    // check if the plugin.json file of a plugin exists and get its content if it does using fs
    const pluginExists = existsSync(`${pluginPath}/plugin.json`)

    if (pluginExists) {
        const plugin = await fs.readFile(`${pluginPath}/plugin.json`, 'utf-8')
        return JSON.parse(plugin)
    } else {
        return null
    }
}

export const uninstallPlugin = async (pluginName: string): Promise<boolean> => {

    try {
        const path = getPathOfPlugin(pluginName)
        await fs.rm(path, { recursive: true })

        return true
        
    } catch (err) {
        return false
    }
}

export const getPathOfPlugin = (pluginName: string): string => {
    return resolve() + '/src/plugins/' + pluginName
}