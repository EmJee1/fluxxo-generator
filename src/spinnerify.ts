import cliSpinners from 'cli-spinners'
import ora from 'ora'

const spinnerify = (text: string, cb: () => any) => {
	const spinner = ora({ text, spinner: cliSpinners.clock }).start()

	const cbResponse = cb()

	if (cbResponse === false) spinner.fail()
	else spinner.succeed()

	return true
}

export default spinnerify
