import { createCommand } from "commander"

import bot from "./bot"

export const init = createCommand()

    .name('init')
    .description('init a tscord project')

    .addCommand(bot)