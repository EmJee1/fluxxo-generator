import shell from 'shelljs'

const PROD_MODULES = ['bull']
const MODULES = ['@types/bull']

const queuesPlugin = (targetPath: string) => {
	shell.cd(targetPath)

	MODULES.forEach(module => shell.exec(`npm i -D ${module} --silent`))
	PROD_MODULES.forEach(module => shell.exec(`npm i ${module} --silent`))
}

export default queuesPlugin
