import chalk from "chalk"
import ora from "ora"
import logSymbols from "log-symbols"

export const logger = {

    isVerbose: false,
    spinner: ora(),

    log (message: string) {
        
        if (this.spinner.isSpinning) this.spinner.stop()
        console.log(message)
    },

    error (message: string) {

        if (this.spinner.isSpinning) this.spinner.stop()
        console.error(chalk.red(message))
    },

    success(message: string, addNewLine = true) {
        this.log(`${logSymbols.success} ` + message + (addNewLine ? '\n' : ''))
    },

    failure(message: string, addNewLine = true) {
        this.log(`${logSymbols.error} ` + message + (addNewLine ? '\n' : ''))
    },

    newLine(numberOfLines: number = 1) {
        for (let i = 0; i < numberOfLines; i++) {
            this.log('')
        }
    },

    verbose(message: string) {
        if (this.isVerbose) this.log(message)
    }
}