import chalk from "chalk"
import ora from "ora"

export const logger = {

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
        this.log('✅ ' + message + (addNewLine ? '\n' : ''))
    },

    failure(message: string, addNewLine = true) {
        this.log('❌ ' + message + (addNewLine ? '\n' : ''))
    },

    newLine(numberOfLines: number = 1) {
        for (let i = 0; i < numberOfLines; i++) {
            this.log('')
        }
    }
}