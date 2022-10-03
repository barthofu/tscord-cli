// @ts-ignore
import packageJson from '../package.json'

export const info = {
    name: packageJson.name,
    version: packageJson.version,
    description: packageJson.description,
}

export const repositories = {

    plugins: {
        owner: 'barthofu',
        repo: 'tscord-plugins',
        branch: 'main',
    },

    cli: {
        owner: 'barthofu',
        repo: 'tscord-cli',
        branch: 'main',
    },

    template: {
        owner: 'barthofu',
        repo: 'tscord',
        branch: 'main',
    }
}