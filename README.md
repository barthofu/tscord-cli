# TSCord CLI

## Todo

### Global
- [ ] verbose option
- [ ] non-interactive option
- [ ] auto-check CLI version at startup
- [ ] beautify

### Plugin
- [x] --short on `search` command

### Generate
- [ ] remove the plop CLI from the TSCord template and add it to this CLI
- [ ] make a command that will **extract** the plop CLI to the users template project
- [x] when using the `generate` command, check if the directory where the user make the command has a `cli` folder:
    - if **yes**: use his local plopfile instead of the CLIs one
    - if **no**: use the CLIs one
- [ ] add types
    - [ ] Service 
    - [ ] Utils
        - [ ] Custom error
        - [ ] Class
        - [ ] Function
    - [ ] Decorator
    - [ ] API route
    - [ ] API middleware
    - [ ] i18n language (would c/p an other language file to have it boilerplate ready)