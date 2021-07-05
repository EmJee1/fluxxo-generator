import editJsonFile from 'edit-json-file'
import shell from 'shelljs'
import path from 'path'

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
	const packageJson = editJsonFile(path.join(targetPath, 'package.json'))

	Object.entries(SCRIPTS).forEach(([key, value]) =>
		packageJson.set(`scripts.${key}`, value)
	)
	packageJson.save()

	shell.cd(targetPath)
	MODULES.forEach(module => shell.exec(`npm i -D ${module} --silent`))
}

export default eslintPlugin
