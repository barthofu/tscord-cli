import { existsSync } from "fs"
import { resolve } from "path"

export const getCurrentPackageManager = (): string => {

    if (existsSync(resolve() + '/pnpm-lock.yaml')) return 'pnpm'
    else if (existsSync(resolve() + '/yarn.lock')) return 'yarn'
    else return 'npm'
}