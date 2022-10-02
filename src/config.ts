// @ts-ignore
import packageJson from '../package.json'

export const info = {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
}

export const officialMonorepo = {
    owner: 'barthofu',
    repo: 'tscord-plugins',
    branch: 'main',
}