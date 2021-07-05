#!/usr/bin/env node

import inquirer from 'inquirer'
import chalk from 'chalk'
import path from 'path'
import fs from 'fs'
import spinnerify from './spinnerify.js'
import copyDirectoryContent from './copyDirectoryContent.js'
import postProcess from './postProcess.js'

export type Databases = 'Mongoose' | 'MySQL'
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
]

export interface InquirerResponse {
	name: string
	database: Databases
}

inquirer
	.prompt(QUESTIONS)
	.then((inquirerData: InquirerResponse) => {
		const { name } = inquirerData

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

		spinnerify('📦 Installing dependencies', () => postProcess(targetPath))
	})
	.catch(console.error)
