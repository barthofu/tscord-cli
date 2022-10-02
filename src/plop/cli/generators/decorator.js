const path = require('path')

module.exports = (plop) => {

    plop.setGenerator('utils::decorator', {

        description: 'Create a new decorator',
        
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the decorator ?',
            }
        ],
        actions: [
            {
                type: 'add',
                path: `${path.resolve()}/src/utils/decorators/{{pascalCase name}}.ts`,
                templateFile: 'templates/decorator.ts.hbs',
            },
            {
                type: 'append',
                path: `${path.resolve()}/src/utils/decorators/index.ts`,
                template: 'export * from \'./{{pascalCase name}}\'',
            }
        ]
    })
}