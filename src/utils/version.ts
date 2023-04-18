import semver from 'semver'

export const getHighestVersion = (versions: { [key: string]: string }) => {

    const keys = Object.keys(versions).sort((a, b) => semver.compare(a, b))
    
    return keys[keys.length - 1]
}