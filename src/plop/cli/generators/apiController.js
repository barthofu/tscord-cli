const path = require('path')

module.exports = (plop) => {

    plop.setGenerator('api::controller', {

        description: 'Create a new API Controller',
        
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the API Controller ?',
            }
        ],
        actions: [
            {
                type: 'add',
                path: `${path.resolve()}/src/api/controllers/{{pascalCase name}}.ts`,
                templateFile: 'templates/apiController.ts.hbs',
            },
            {
                type: 'append',
                path: `${path.resolve()}/src/api/controllers/index.ts`,
                template: 'export * from \'./{{pascalCase name}}\'',
            }
        ]
    })
}