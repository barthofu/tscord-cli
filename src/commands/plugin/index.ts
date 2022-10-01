import { createCommand } from 'commander'

import install from './install'
import uninstall from './uninstall'
import update from './update'
import search from './search'
import info from './info'

export const plugin = createCommand()
    .name('plugin')
    .description('manage plugins')

    .addCommand(install)
    .addCommand(uninstall)
    .addCommand(update)
    .addCommand(search)
    .addCommand(info)