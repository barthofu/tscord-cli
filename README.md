# TSCord CLI

The official CLI for your [TSCord](https://github.com/barthofu/tscord) application!

## Installation

```bash
npm install -g tscord-cli
```

## Usage

```bash
tscord --help
```

## Commands

### Init

The easiest way to get started with TSCord is by using the `init` command. It'll enable you to quickly start building a new TSCord application, with everything set up for you.

> **info**
> For the moment, only the `bot` template can be init with the CLI.

```bash
tscord init bot <name>
```

### Generate

You can generate every type of file needed in a TSCord bot application using the CLI in order to speed up your development process.

First, run the command:
```bash
tscord generate
```
Then, choose the type of file you want and finally answer the extra questions depending on the file type.

You can also shortcut it by running:
```bash
tscord generate <type>
```
directly.

#### Extraction

At some point you'll probably need to customize the generation CLI in different ways, for example:
- edit the generated templates
- customize the logic behind the some generators
- add new generators and templates 

It can be achieved by **extracting** it in your local project!

Simply run this command:
```bash
tscord generate --extract
```
and the source code will be copied in the root of your tscord project under the `cli` folder.

This part of the CLI is using **[plop.js]()** under the hood, so we highly recommend you to check their documentation so you can understand and customize efficiently the generators/templates for your unique needs!

### Plugin

Plugins are hosted on the [barthofu/tscord-plugins](https://github.com/barthofu/tscord-plugins) github repository. 
The CLI let you manage them in many ways!

> **note**
> When we talk about **plugin name**, it is in fact their folder name which also acts as their unique identifier.

#### Install

Use the `plugin install` command to install a plugin locally.

```bash
tscord plugin install <name>
```

#### Uninstall

Use the `plugin uninstall` command to uninstall a plugin locally.

```bash
tscord plugin uninstall <name>
```

#### Update

Updating a plugin is done with the `plugin update` command.

```bash
tscord plugin update <name>
```

#### Search

You can search for plugins and have info on them with the `plugin search` command.

```bash
tscord plugin search <query>
```

**Options:**
- `-l, --limit <number>` limit the number of results (default: "10")
- `-s, --short` speed up search command by not showing extra information on plugins

#### Info

The `plugin info` command show you all the information about a plugin.

```bash
tscord plugin info <name>
``` 

## Todo
- [ ] verbose option
- [ ] non-interactive option
- [ ] auto-check CLI version at startup
- [x] beautify