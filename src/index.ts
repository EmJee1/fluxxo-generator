#!/usr/bin/env node

import inquirer from 'inquirer'
import chalk from 'chalk'
import path from 'path'
import fs from 'fs'
import spinnerify from './spinnerify.js'
import copyDirectoryContent from './copyDirectoryContent.js'
import installModules from './plugins/installModules.js'
import eslintPlugin from './plugins/eslint.js'

export type Databases = 'Mongoose' | 'MySQL'
export type Plugins = 'eslint' | 'tests' | 'seeders' | 'docs' | 'queues'

const CHOICES: Databases[] = ['Mongoose', 'MySQL']

const QUESTIONS = [
	{
		name: 'name',
		message: 'Project name:',
	},
	{
		name: 'database',
		type: 'list',
		message: 'Select your desired database system',
		choices: CHOICES,
	},
	{
		name: 'plugins',
		message: 'Plugins in this project',
		type: 'checkbox',
		choices: [
			{ name: 'ESLint', value: 'eslint' },
			{ name: 'Tests (with the Jest framework)', value: 'tests' },
			{ name: 'Database seeders', value: 'seeders' },
			{ name: 'API Documentation (with swaggerUI)', value: 'docs' },
			{ name: 'Queues (requires a Redis server)', value: 'queues' },
		],
	},
]

export interface InquirerResponse {
	name: string
	database: Databases
	plugins: Plugins[]
}

inquirer
	.prompt(QUESTIONS)
	.then((inquirerData: InquirerResponse) => {
		const { name, plugins } = inquirerData

		const originalPath = path.join(__dirname, '..', 'template')
		const targetPath = path.join(process.cwd(), name)

		if (fs.existsSync(targetPath))
			return console.error(
				chalk.red(`A folder with the name '${name}' already exists \n`) +
					chalk.red('Please choose a different name or delete the folder')
			)

		fs.mkdirSync(targetPath)

		spinnerify('💾 Copying folders', () =>
			copyDirectoryContent(originalPath, targetPath, inquirerData)
		)

		// spinnerify('📦 Installing dependencies', () => postProcess(targetPath))

		const hasPlugin = (plugin: Plugins) => plugins.includes(plugin)

		if (hasPlugin('eslint'))
			spinnerify('⚖️ Configuring eslint', () => eslintPlugin())
	})
	.catch(console.error)
