import shell from 'shelljs'

const MODULES = [
	'@typescript-eslint/eslint-plugin',
	'@typescript-eslint/parser',
	'eslint',
	'eslint-config-airbnb-base',
	'eslint-import-resolver-typescript',
	'eslint-plugin-import',
]

const eslintPlugin = () =>
	MODULES.forEach(module => {
		shell.exec(`npm i -D ${module} --silent`)
	})

export default eslintPlugin
