import { checkLocation } from "@middlewares"
import { getTscordVersion, logger } from "@utils"
import { createCommand } from "commander"
import { resolve } from "path"
import { readFile } from "fs/promises"
import chalk from "chalk"
import boxen from "boxen"

export const info = createCommand()

    .name('info')
    .description('display infos about your tscord project')

    .action(async () => {

        if (!await checkLocation()) return

        const packageRaw = await readFile(resolve() + '/package.json', 'utf-8'),
              packageJson = JSON.parse(packageRaw)

        const message = boxen(
            (packageJson.description ? `${chalk.bold('description:')} ${packageJson.description}\n` : '') +
            (packageJson.author ? `${chalk.bold('author:')} ${packageJson.author}\n` : '') +
            `${chalk.bold('project version:')} ${chalk.bgBlack(packageJson.version)}\n` +
            `${chalk.bold('tscord version:')} ${chalk.bgBlack(await getTscordVersion())}\n` +
            `${chalk.bold('project location:')} ${chalk.gray(process.cwd())}`,
            {
                title: chalk.bold.greenBright(packageJson.name),
                titleAlignment: 'center',
                padding: 1,
                borderStyle: 'round',
            }
        )

        logger.newLine()
        logger.log(message)
        logger.newLine()
    })