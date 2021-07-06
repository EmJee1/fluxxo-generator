import shell from 'shelljs'
import updatePackageScripts from '../updatePackageScripts.js'

const MODULES = ['@types/jest', 'jest', '@types/supertest', 'supertest']
const SCRIPTS = {
	test: 'cross-env NODE_ENV=development jest --testPathPattern=dist',
	'test:watch':
		'cross-env NODE_ENV=development jest --watch --testPathPattern=dist',
}

const testsPlugin = (targetPath: string) => {
	updatePackageScripts(targetPath, SCRIPTS)

	shell.cd(targetPath)
	MODULES.forEach(module => shell.exec(`npm i -D ${module} --silent`))
}

export default testsPlugin
