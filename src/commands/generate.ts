import { Argument, createCommand } from "commander"
import nodePlop, { NodePlopAPI } from "node-plop"
import { resolve } from "path"
import inquirer from 'inquirer'

export const generate = createCommand()
    .name('generate')
    .description('generate different types of files based on sanitized templates')

    .addArgument(
        new Argument('[type]', 'type of file you want to generate.')
    )

    .action(async (type: string | undefined) => {

        const plop = await nodePlop(resolve() + '/cli/plopfile.js')

        if (!type) type = await getTypeFromUser(plop)

        const generator = plop.getGenerator(type)

        if (!generator) {
            console.log(`Generator "${type}" not found!`)
            return
        }

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
        choices: generators.map(generator => generator.name)
    }])

    return result.type
}