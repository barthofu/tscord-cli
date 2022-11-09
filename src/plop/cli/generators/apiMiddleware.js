const path = require('path')

module.exports = (plop) => {

    plop.setGenerator('api::middleware', {

        description: 'Create a new API Middleware',
        
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the API Middleware ?',
            }
        ],
        actions: [
            {
                type: 'add',
                path: `${path.resolve()}/src/api/middlewares/{{camelCase name}}.ts`,
                templateFile: 'templates/apiMiddleware.hbs',
            },
            {
                type: 'append',
                path: `${path.resolve()}/src/api/middlewares/index.ts`,
                template: 'export * from \'./{{camelCase name}}\'',
            }
        ]
    })
}