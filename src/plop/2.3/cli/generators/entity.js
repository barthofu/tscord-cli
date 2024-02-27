const path = require('path')

module.exports = (plop) => {

    plop.setGenerator('entity', {

        description: 'Create a new entity',
        
        prompts: [{
            type: 'input',
            name: 'name',
            message: 'What is the name of the entity?',
        }],
        actions: [
            {
                type: 'add',
                path: `${path.resolve()}/src/entities/{{pascalCase name}}.ts`,
                templateFile: 'templates/entity.hbs',
            },
            {
                type: 'append',
                path: `${path.resolve()}/src/entities/index.ts`,
                template: 'export * from \'./{{pascalCase name}}\'',
            }
        ]
    })
}