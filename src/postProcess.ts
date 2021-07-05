import cliSpinners from 'cli-spinners'
import shell from 'shelljs'
import ora from 'ora'

const postProcess = (targetPath: string) => {
	shell.cd(targetPath)
	const result = shell.exec('npm ci --silent')

	if (result.code !== 0) return false

	return true
}

export default postProcess
