import path from 'path'
import fs from 'fs'
import render from './template.js'
import { InquirerResponse } from './index.js'

const copyDirectoryContent = (
	templatePath: string,
	targetPath: string,
	data: InquirerResponse
) => {
	const filesToCreate = fs.readdirSync(templatePath)

	filesToCreate.forEach(file => {
		const originalFilePath = path.join(templatePath, file)

		const stats = fs.statSync(originalFilePath)

		if (stats.isDirectory()) {
			fs.mkdirSync(path.join(targetPath, file))
			return copyDirectoryContent(
				originalFilePath,
				path.join(targetPath, file),
				data
			)
		}

		let fileContent = fs.readFileSync(originalFilePath, 'utf-8')

		if (path.extname(file) !== '.ejs')
			fileContent = render(fileContent, data)

		const writePath = path.join(targetPath, file)

		fs.writeFileSync(writePath, fileContent)
	})
}

export default copyDirectoryContent
