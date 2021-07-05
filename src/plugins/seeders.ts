import shell from 'shelljs'

const MODULES = ['mongo-seeding']

const seedersPlugin = (targetPath: string) => {
	shell.cd(targetPath)
	MODULES.forEach(module => shell.exec(`npm i -D ${module} --silent`))
}

export default seedersPlugin
