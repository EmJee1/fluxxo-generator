import shell from 'shelljs'

const MODULES = ['swagger-ui-express', '@types/swagger-ui-express']

const docsPlugin = (targetPath: string) => {
	shell.cd(targetPath)
	MODULES.forEach(module => shell.exec(`npm i -D ${module} --silent`))
}

export default docsPlugin
