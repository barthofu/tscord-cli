const path = require('path')

module.exports = (plop) => {

    plop.setGenerator('service', {

        description: 'Create a new service',
        
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the service ?',
            }
        ],
        actions: [
            {
                type: 'add',
                path: `${path.resolve()}/src/services/{{pascalCase name}}.ts`,
                templateFile: 'templates/service.ts.hbs',
            },
            {
                type: 'append',
                path: `${path.resolve()}/src/services/index.ts`,
                template: 'export * from \'./{{pascalCase name}}\'',
            }
        ]
    })
}