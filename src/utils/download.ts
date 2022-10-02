import { createWriteStream, promises as fs } from 'fs'
import { tmpdir } from 'os'
import pathUtil from 'path'
import { Readable, Stream } from 'stream'
import { promisify } from 'util'
import tar from 'tar'
import axios from 'axios'

import { officialMonorepo } from '@config'

const baseUrl = 'https://codeload.github.com/'

export const downloadTar = async (
	owner: string,
	repo: string,
	branch: string,
) => {

	const pipeline = promisify(Stream.pipeline)
	const tempFile = pathUtil.join(tmpdir(), `tscord-plugin.temp-${Date.now()}`)

	const request = await axios({
		responseType: 'stream',
		url: `${baseUrl}/${owner}/${repo}/tar.gz/${branch}`,
	})

	await pipeline(Readable.from(request.data), createWriteStream(tempFile))
	return tempFile
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

	try {
		
		const tempFile = await downloadTar(options.owner, options.repo, options.branch)
	
		await tar.x({
			cwd: path,
			file: tempFile,
			filter: (p) => p.includes(pluginName),
			strip: 1,
		})
	
		await fs.unlink(tempFile)
	
		return true

	} catch (err) {

		return false
	}
}