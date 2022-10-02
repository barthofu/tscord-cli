import { request } from '@octokit/request'

import { config } from '@config'

const githubDirectoryCode = '040000'

export const getPluginsFromMonorepo = async ({ owner, repo, branch} = config.officialMonorepo): Promise<string[]> => {

    const response = await request('GET /repos/{owner}/{repo}/git/trees/{branch}', {
        owner,
        repo,
        branch,
    })

    return response.data.tree
        .filter((item: any) => item.mode === githubDirectoryCode)
        .map((item: any) => item.path)
}

export const getPluginFromMonorepo = async (
    pluginName: string,
    { owner, repo, branch} = config.officialMonorepo
): Promise<any | null> => {

    return request('GET https://raw.githubusercontent.com/{owner}/{repo}/main/{pluginName}/plugin.json', {
        owner,
        repo,
        pluginName,
    })
        .then((response: any) => response.data)
        .catch((error: any) => null)
}