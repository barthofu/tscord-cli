import { request } from "@octokit/request"

import { repositories } from "@config"
import { getHighestVersion, logger } from "@utils"

export const getPluginsFromMonorepo = async ({ owner, repo } = repositories.plugins): Promise<string[]> => {

    const response = await request('GET /repos/{owner}/{repo}/contents/plugins', {
        owner,
        repo,
    })

    return response.data
        .filter((item: any) => item.type === 'dir')
        .map((item: any) => item.name)
}

export const getPluginFromMonorepo = async (
    pluginName: string,
    version: string = 'latest',
    { owner, repo } = repositories.plugins
): Promise<PluginConfig | null> => {
    
    const versionsRegistry = await getVersionsRegistry()
    if (!versionsRegistry) return null

    if (version === 'latest') version = getHighestVersion(versionsRegistry[pluginName])

    const commitHash = versionsRegistry[pluginName][version]
    if (!commitHash) return null

    return request('GET https://raw.githubusercontent.com/{owner}/{repo}/{branch}/plugins/{pluginName}/plugin.json', {
        owner,
        repo,
        pluginName,
        branch: commitHash
    })
        .then((response: any) => ({
            ...JSON.parse(response.data),
            commitHash
        }))
        .catch((error: any) => null)
}

export const getVersionsRegistry = async ({ owner, repo } = repositories.plugins): Promise<VersionsRegistry | null> => {

    return request('GET https://raw.githubusercontent.com/{owner}/{repo}/main/versions.json', {
        owner,
        repo,
    })
        .then((response: any) => JSON.parse(response.data))
        .catch((error: any) => null)
}