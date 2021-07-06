import shell from 'shelljs'
import updatePackageScripts from '../updatePackageScripts.js'

const MODULES = [
	'@typescript-eslint/eslint-plugin',
	'@typescript-eslint/parser',
	'eslint',
	'eslint-config-airbnb-base',
	'eslint-import-resolver-typescript',
	'eslint-plugin-import',
]
const SCRIPTS = { lint: 'eslint ./src/ --ext .ts' }

const eslintPlugin = (targetPath: string) => {
	updatePackageScripts(targetPath, SCRIPTS)

	shell.cd(targetPath)
	MODULES.forEach(module => shell.exec(`npm i -D ${module} --silent`))
}

export default eslintPlugin
