const path = require('path')

module.exports = (plop) => {

    plop.setGenerator('guard', {
    
        description: 'Create a new guard function',

        prompts: [{
            type: 'input',
            name: 'name',
            message: 'What is the name of the guard?',
        }],
        actions: [
            {
                type: 'add',
                path: `${path.resolve()}/src/guards/{{camelCase name}}.ts`,
                templateFile: 'templates/guard.ts.hbs',
            },
            {
                type: 'append',
                path: `${path.resolve()}/src/guards/index.ts`,
                template: 'export * from \'./{{camelCase name}}\'',
            }
        ]
    })
}