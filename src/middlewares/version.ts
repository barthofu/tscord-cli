import { info, selfRepo } from '@config'
import { request } from '@octokit/request'
import { logger } from '@utils'
import boxen from 'boxen'
import chalk from 'chalk'

/**
 * Check if the user has the latest version of the CLI installed.
 */
export const checkVersion = async () => {

    const currentVersion = info.version

    // get latest version from github
    return request('GET https://raw.githubusercontent.com/{owner}/{repo}/main/package.json', selfRepo)
        .then((response: any) => {

            const json = JSON.parse(response.data)
            const latestVersion: string | undefined = json.version
            if (!latestVersion) return true
            
            if (currentVersion !== latestVersion) {
                logger.newLine()
                logger.log(
                    boxen(
                        'Run ' + chalk.bold.bgHex('#404040')(` npm i -g ${info.name}@${latestVersion} `) + ' to update to the latest version',
                        {
                            title: chalk.hex('#fc7f03')(`A new version of ${chalk.bold('TSCord CLI')} is available: ${chalk.greenBright(latestVersion)}`),
                            titleAlignment: 'center',
                            borderStyle: 'round',
                            padding: { left: 1, right: 1, top: 0, bottom: 0 },
                            borderColor: '#fc7f03'
                        }
                    )
                )
            }

            return true
        })
        .catch((_: any) => {

            // if we can't access the remote, we return true anyway and don't show anything
            return true
        })
}