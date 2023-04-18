type PluginConfig = BasePluginConfig & {
    commitHash: string
}

type BasePluginConfig = {
    name: string
    description: string
    author: string
    version: string
    tscordRequiredVersion: string
}

type VersionsRegistry = {
    [key: string]: {
        [key: string]: string
    }
}
