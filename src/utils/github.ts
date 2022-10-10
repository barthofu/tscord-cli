import { request } from "@octokit/request"

import { repositories } from "@config"

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
    { owner, repo } = repositories.plugins
): Promise<PluginConfig | null> => {

    return request('GET https://raw.githubusercontent.com/{owner}/{repo}/main/plugins/{pluginName}/plugin.json', {
        owner,
        repo,
        pluginName,
    })
        .then((response: any) => JSON.parse(response.data))
        .catch((error: any) => null)
}