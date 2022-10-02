const path = require('path')

module.exports = (plop) => {

    plop.setGenerator('utils::function', {

        description: 'Create a new utility function',
        
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the function ?',
            }
        ],
        actions: [
            {
                type: 'add',
                path: `${path.resolve()}/src/utils/functions/{{camelCase name}}.ts`,
                templateFile: 'templates/function.ts.hbs',
            },
            {
                type: 'append',
                path: `${path.resolve()}/src/utils/functions/index.ts`,
                template: 'export * from \'./{{camelCase name}}\'',
            }
        ]
    })
}