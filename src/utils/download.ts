import { createWriteStream, promises as fs } from 'fs'
import { tmpdir } from 'os'
import pathUtil from 'path'
import { Readable, Stream } from 'stream'
import { promisify } from 'util'
import tar from 'tar'
import axios from 'axios'

import { officialMonorepo } from '@config'

const baseUrl = 'https://codeload.github.com/'

export const downloadDirectoryFromGithubRepo = async (
	destinationPath: string,
	subDirectory: string,
	source = officialMonorepo,
	strip = 1
) => {

	try {

		// download the whole repository
		const pipeline = promisify(Stream.pipeline)
		const tempFile = pathUtil.join(tmpdir(), `temp-${Date.now()}`)

		const request = await axios({
			responseType: 'stream',
			url: `${baseUrl}/${source.owner}/${source.repo}/tar.gz/${source.branch}`,
		})

		await pipeline(Readable.from(request.data), createWriteStream(tempFile))

		// extract the subdirectory
		await tar.x({
			cwd: destinationPath,
			file: tempFile,
			filter: (p) => p.includes(subDirectory),
			strip
		})

		await fs.unlink(tempFile)

		return true

	} catch (err) {
		console.error(err)
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
	path: string = pathUtil.resolve() + '/src/plugins',
	options = officialMonorepo
): Promise<boolean> => {

	return downloadDirectoryFromGithubRepo(path, pluginName, options)
}

export const downloadPlopFromGithub = async (destinationPath: string = pathUtil.resolve()) => {

	return downloadDirectoryFromGithubRepo(destinationPath, 'src/plop/cli/', {
		owner: 'barthofu',
		repo: 'tscord-cli',
		branch: 'main'
	}, 3)
}