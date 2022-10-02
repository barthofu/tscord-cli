const path = require('path')

module.exports = (plop) => {

    plop.setGenerator('utils::class', {

        description: 'Create a new utility class',
        
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the class ?',
            }
        ],
        actions: [
            {
                type: 'add',
                path: `${path.resolve()}/src/utils/classes/{{pascalCase name}}.ts`,
                templateFile: 'templates/class.ts.hbs',
            },
            {
                type: 'append',
                path: `${path.resolve()}/src/utils/classes/index.ts`,
                template: 'export * from \'./{{pascalCase name}}\'',
            }
        ]
    })
}