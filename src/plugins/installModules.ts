import shell from 'shelljs'

const installModules = (targetPath: string) => {
	shell.cd(targetPath)
	const result = shell.exec('npm ci --silent')

	if (result.code !== 0) return false

	return true
}

export default installModules
