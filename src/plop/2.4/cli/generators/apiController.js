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
                path: `${path.resolve()}/src/api/controllers/{{camelCase name}}.ts`,
                templateFile: 'templates/apiController.hbs',
            },
            {
                type: 'append',
                path: `${path.resolve()}/src/api/controllers/index.ts`,
                template: 'export * from \'./{{camelCase name}}\'',
            }
        ]
    })
}