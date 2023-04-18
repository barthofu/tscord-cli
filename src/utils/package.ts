import { existsSync } from "fs"
import { readFile } from "fs/promises"
import { resolve } from "path"

export const getCurrentPackageManager = (): string => {

    if (existsSync(resolve() + '/pnpm-lock.yaml')) return 'pnpm'
    else if (existsSync(resolve() + '/yarn.lock')) return 'yarn'
    else return 'npm'
}

export const getPackageJson = async () => {
    
    const packageJson = await readFile(resolve() + '/package.json', 'utf-8')
    return JSON.parse(packageJson)
}