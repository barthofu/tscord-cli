import { repositories } from "@config"
import { downloadReleaseFromGithub, logger } from "@utils"
import chalk from "chalk"
import { createCommand } from "commander"
import { existsSync } from "fs"
import { mkdir, rm, rmdir } from "fs/promises"
import { resolve } from "path"
import simpleGit from "simple-git"
import { spawn } from 'spawnise'

const git = simpleGit()

export default createCommand()

    .name('bot')
    .description('init a discord bot based on the tscord template')

    .argument('<name>', 'name of the bot')
    .argument('[version]', 'specify the version of the template to use', 'latest')

    .option('--no-deps', 'do not install dependencies')
    .option('--no-git', 'do not setup git')
    .option('--pnpm', 'use pnpm instead of npm')
    .option('--yarn', 'use yarn instead of npm')

    .action(async (name: string, version: string, options) => {

        logger.newLine()
        logger.spinner.start('Downloading template...')

        // guards
        if (existsSync(resolve(name))) return logger.failure('A folder with this name already exists')

        // create the folder
        await mkdir(name)

        // download the template
        const success = await downloadReleaseFromGithub(
            name,
            repositories.template,
            version
        )
        
        if (!success) {

            await rmdir(name)
            logger.failure('Failed to download the template' + (version !== 'latest' ? `\n  Version ${chalk.bold(version)} does not exist` : ''))
            return
        }


        // install dependencies
        if (options.deps) {

            logger.spinner.start('Installing dependencies...')

            const packageManager = options.pnpm ? 'pnpm' : options.yarn ? 'yarn' : 'npm'

            if (packageManager !== 'npm') await rm(resolve(name, 'package-lock.json'))

            await spawn(packageManager, ['install'], {
                env: process.env,
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