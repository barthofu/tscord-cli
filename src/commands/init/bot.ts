import { repositories } from "@config"
import { downloadRepoFromGithub, logger } from "@utils"
import { createCommand } from "commander"
import { existsSync } from "fs"
import { mkdir } from "fs/promises"
import { resolve } from "path"
import simpleGit from "simple-git"

const git = simpleGit()

export default createCommand()

    .name('bot')
    .description('init a discord bot based on the tscord template')

    .argument('<name>', 'name of the bot')

    .action(async (name: string) => {

        // guards
        if (existsSync(resolve(name))) return logger.failure('A folder with this name already exists')

        // create the folder
        await mkdir(name)

        // download the template
        await downloadRepoFromGithub(
            name,
            repositories.template
        )

        // setup git
        await git.cwd(resolve(name))
        await git.init()
        await git.add('.')
        await git.commit('init project from barthofu/tscord')
    })

