import editJsonFile from 'edit-json-file'
import path from 'path'

const updatePackageScripts = (
	targetPath: string,
	scripts: { [key: string]: any }
) => {
	const packageJson = editJsonFile(path.join(targetPath, 'package.json'))

	Object.entries(scripts).forEach(([key, value]) =>
		packageJson.set(`scripts.${key}`, value)
	)

	packageJson.save()
}

export default updatePackageScripts
