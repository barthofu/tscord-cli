import { info, repositories } from '@config'
import { request } from '@octokit/request'
import { logger } from '@utils'
import boxen from 'boxen'
import chalk from 'chalk'

/**
 * Warns about the deprecation of the CLI
 */
export const deprecation = () => {

    logger.newLine()
    logger.log(
        boxen(
            `This CLI is deprecated and is no longer be maintained. It only supports TSCord up to version ${ chalk.bold.bgBlack('2.2') }.\nPlease consider using the new CLI package named ${ chalk.bold.bgBlack('tscord') }.` 
            +
            '\n\n'
            +
            chalk.bold.bgBlack(`npm uninstall -g ${info.name}`)
            +
            '\n'
            +
            chalk.bold.bgBlack(`npm i -g tscord`)
            ,
            {
                title: chalk.hex('#fc7f03')(`Deprecation warning`),
                titleAlignment: 'center',
                borderStyle: 'round',
                padding: { left: 1, right: 1, top: 0, bottom: 0 },
                borderColor: '#fc7f03'
            } 
        )
    )

    return true
}