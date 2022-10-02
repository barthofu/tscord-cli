# TSCord CLI

## Todo

### Global
- [ ] verbose option
- [ ] non-interactive option
- [ ] auto-check CLI version at startup
- [x] beautify

### Plugin
- [x] --short on `search` command

### Generate
- [x] remove the plop CLI from the TSCord template and add it to this CLI
- [x] make a command that will **extract** the plop CLI to the users template project
- [x] when using the `generate` command, check if the directory where the user make the command has a `cli` folder:
    - if **yes**: use his local plopfile instead of the CLIs one
    - if **no**: use the CLIs one
- [x] add types
    - [x] Service 
    - [x] Utils
        - [x] Custom error
        - [x] Class
        - [x] Function
        - [x] Decorator
    - [x] API controller
    - [x] API middleware
    - [x] i18n language (could be nice to c/p an other language file to have it boilerplate ready)