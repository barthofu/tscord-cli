import { createCommand } from "commander"

import bot from "./bot"

export const plugin = createCommand()
    .name('init')
    .description('init a tscord project')

    .addCommand(bot)