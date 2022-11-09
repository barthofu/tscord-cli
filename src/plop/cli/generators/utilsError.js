const path = require('path')

module.exports = (plop) => {

    plop.setGenerator('utils::error', {

        description: 'Create a new custom error',
        
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the custom error ?',
            }
        ],
        actions: [
            {
                type: 'add',
                path: `${path.resolve()}/src/utils/errors/{{pascalCase name}}.ts`,
                templateFile: 'templates/utilsError.hbs',
            },
            {
                type: 'append',
                path: `${path.resolve()}/src/utils/errors/index.ts`,
                template: 'export * from \'./{{pascalCase name}}\'',
            }
        ]
    })
}