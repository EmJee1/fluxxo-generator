import editJsonFile from 'edit-json-file'
import shell from 'shelljs'
import path from 'path'

const MODULES = ['@types/jest', 'jest', '@types/supertest', 'supertest']
const SCRIPTS = {
	test: 'cross-env NODE_ENV=development jest --testPathPattern=dist',
	'test:watch':
		'cross-env NODE_ENV=development jest --watch --testPathPattern=dist',
}

const testsPlugin = (targetPath: string) => {
	const packageJson = editJsonFile(path.join(targetPath, 'package.json'))

	Object.entries(SCRIPTS).forEach(([key, value]) =>
		packageJson.set(`scripts.${key}`, value)
	)
	packageJson.save()

	shell.cd(targetPath)
	MODULES.forEach(module => shell.exec(`npm i -D ${module} --silent`))
}

export default testsPlugin
