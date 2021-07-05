import path from 'path'
import fs from 'fs'
import render from './template.js'
import { InquirerResponse, Plugins } from './index.js'

const EXCLUSIONS = {
	eslint: ['.eslintrc.json'],
}

const copyDirectoryContent = (
	templatePath: string,
	targetPath: string,
	data: InquirerResponse
) => {
	const filesToCreate = fs.readdirSync(templatePath)

	const hasPlugin = (plugin: Plugins) => data.plugins.includes(plugin)

	filesToCreate.forEach(file => {
		if (!hasPlugin('eslint') && EXCLUSIONS.eslint.includes(file)) return

		const originalFilePath = path.join(templatePath, file)

		const stats = fs.statSync(originalFilePath)

		if (stats.isDirectory()) {
			if (!hasPlugin('tests') && file === 'tests') return

			fs.mkdirSync(path.join(targetPath, file))
			return copyDirectoryContent(
				originalFilePath,
				path.join(targetPath, file),
				data
			)
		}

		let fileContent = fs.readFileSync(originalFilePath, 'utf-8')

		if (path.extname(file) !== '.ejs') fileContent = render(fileContent, data)

		const writePath = path.join(targetPath, file)

		fs.writeFileSync(writePath, fileContent)
	})
}

export default copyDirectoryContent
