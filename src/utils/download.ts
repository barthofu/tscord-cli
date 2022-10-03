import { createWriteStream, promises as fs } from 'fs'
import { tmpdir } from 'os'
import { join, resolve } from 'path'
import { Readable, Stream } from 'stream'
import { promisify } from 'util'
import tar from 'tar'
import axios from 'axios'

import { repositories } from '@config'

const baseUrl = 'https://codeload.github.com/'

/**
 * Downloads a github repository
 * @param destinationPath the path where the repository will be downloaded
 * @param source the source of the repository (owner, repo, branch)
 * @param subDirectory if set, the subdirectory to download
 * @param strip if set, the number of directories to strip from the path
 * @returns 
 */
export const downloadRepoFromGithub = async (
	destinationPath: string,
	source = repositories.plugins,
	subDirectory: string | null = null,
	strip = 1
) => {

	try {

		// download the whole repository
		const pipeline = promisify(Stream.pipeline)
		const tempFile = join(tmpdir(), `temp-${Date.now()}`)

		const request = await axios({
			responseType: 'stream',
			url: `${baseUrl}/${source.owner}/${source.repo}/tar.gz/${source.branch}`,
		})

		await pipeline(Readable.from(request.data), createWriteStream(tempFile))

		// extract the repo
		await tar.x({
			cwd: destinationPath,
			file: tempFile,
			// if not null, extract only a subdirectory
			filter: (p) => subDirectory === null || p.includes(subDirectory),
			strip
		})

		// delete the temporary tar file
		await fs.unlink(tempFile)

		return true

	} catch (err) {
		console.log(err)
		return false
	}
	
}

/**
 * Download and extract a plugin from a github monorepo
 *
 * @param pluginName project name
 * @param options optional options
 */
export const downloadPluginFromMonorepo = async (
	pluginName: string,
	path: string = resolve() + '/src/plugins',
	options = repositories.plugins
): Promise<boolean> => {

	return downloadRepoFromGithub(path, options, pluginName)
}

export const downloadPlopFromGithub = async (destinationPath: string = resolve()) => {

	return downloadRepoFromGithub(
		destinationPath, 
		repositories.cli, 
		'src/plop/cli/', 
		3
	)
}