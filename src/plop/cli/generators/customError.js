module.exports = (plop) => {

    plop.setGenerator('event', {

        description: 'Create a new custom error',
        
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'What is the name of the custom error ?',
            }
        ],
        actions: [{
            type: 'add',
            path: '../src/events/{{#if customEvent}}custom/{{/if}}{{camelCase name}}.ts',
            templateFile: 'templates/event.ts.hbs',
        }]
    })
}