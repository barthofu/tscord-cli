import { downloadPlopFromGithub, logger } from "@utils"
import chalk from "chalk"
import { Argument, createCommand } from "commander"
import { existsSync } from "fs"
import inquirer from "inquirer"
import nodePlop, { NodePlopAPI } from "node-plop"
import { resolve } from "path"

export const generate = createCommand()
    .name('generate')
    .description('generate different types of files based on sanitized templates')

    .addArgument(
        new Argument('[type]', 'type of file you want to generate')
    )

    .option('--extract', 'extract the template cli to your project locally so you can edit/add generators and templates')

    .action(async (type: string | undefined, options) => {

        if (options.extract) return extractPlopToLocal()

        const plop = await getPlopInstance()

        if (!type) type = await getTypeFromUser(plop)

        const generator = plop.getGenerator(type)
        if (!generator) return console.log(`Generator "${type}" not found!`)

        const inputs = await generator.runPrompts()
        const results = await generator.runActions(inputs)

        results.changes.forEach(change => {
            console.log(change.type, change.path)
        })

        results.failures.forEach(failure => {
            console.log(failure.type, failure.path)
        })
    })

const getTypeFromUser = async (plop: NodePlopAPI): Promise<string> => {

    const generators = plop.getGeneratorList()

    const result = await inquirer.prompt([{
        type: 'list',
        name: 'type',
        message: 'What do you want to generate?',
        choices: generators
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(({ name, description }) => ({
                name: `${chalk.greenBright(name)} - ${chalk.gray.italic(description ?? plop.getGenerator(name)?.description)}`,
                value: name
            })),
        loop: false
    }])

    return result.type
}

const getPlopInstance = async (): Promise<NodePlopAPI> => {

    const localPlop = existsSync(resolve() + '/cli/plopfile.js')

    if (localPlop) return nodePlop(resolve() + '/cli/plopfile.js')
    else return nodePlop(`${__dirname}/../plop/cli/plopfile.js`)
}

const extractPlopToLocal = async () => {

    const localPlop = existsSync(resolve() + '/cli/plopfile.js')

    if (localPlop) logger.failure('Template CLI is already extracted to your project')
    else {
        
        logger.newLine()

        const success = await downloadPlopFromGithub()

        if (success) logger.success('Template CLI extracted to your project')
        else logger.failure('Something went wrong while extracting the template CLI to your project')
    }
}