const path = require('path')

module.exports = (plop) => {

    plop.setGenerator('i18n', {

        description: 'Create a new langue for i18n',
        
        prompts: [{
            type: 'input',
            name: 'locale',
            message: 'What the local identifier ?',
        }],
        actions: [
            {
                type: 'add',
                path: `${path.resolve()}/src/i18n/{{ locale }}/index.ts`,
                templateFile: 'templates/i18n.ts.hbs',
            }
        ]
    })
}