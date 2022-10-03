import { repositories } from "@config"
import { downloadRepoFromGithub, logger } from "@utils"
import chalk from "chalk"
import { createCommand } from "commander"
import { existsSync } from "fs"
import { mkdir } from "fs/promises"
import { resolve } from "path"
import simpleGit from "simple-git"
import { spawn } from 'spawnise'

const git = simpleGit()

export default createCommand()

    .name('bot')
    .description('init a discord bot based on the tscord template')

    .argument('<name>', 'name of the bot')

    .option('--no-deps', 'do not install dependencies')
    .option('--no-git', 'do not setup git')

    .action(async (name: string, options) => {

        logger.newLine()
        logger.spinner.start('Downloading template...')

        // guards
        if (existsSync(resolve(name))) return logger.failure('A folder with this name already exists')

        // create the folder
        await mkdir(name)

        // download the template
        await downloadRepoFromGithub(
            name,
            repositories.template
        )

        // install dependencies
        if (options.deps) {

            logger.spinner.start('Installing dependencies...')

            await spawn('npm install', {
                cwd: resolve(name),
                stdio: 'ignore'
            })
        }

        // setup git
        if (options.git) {

            logger.spinner.text = 'Setup git...'

            await git.cwd(resolve(name))
            await git.init()
            await git.add('.')
            await git.commit('init project from barthofu/tscord')
    
        }
        
        logger.success(`Successfully initialized ${chalk.bold(name)}!`)
    })