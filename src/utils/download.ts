import { createWriteStream, promises as fs } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { Readable, Stream } from 'stream'
import { promisify } from 'util'
import tar from 'tar'
import axios from 'axios'

import { config } from '@config'

const baseUrl = 'https://codeload.github.com/'

export const downloadTar = async (
	owner: string = config.officialMonorepo.owner,
    repo: string = config.officialMonorepo.repo,
    branch: string = config.officialMonorepo.branch
) => {

	const pipeline = promisify(Stream.pipeline)
	const tempFile = join(tmpdir(), `tscord-plugin.temp-${Date.now()}`)

	const request = await axios({
		responseType: 'stream',
		url: `${baseUrl}/${owner}/${repo}/tar.gz/${branch}`,
	})

	await pipeline(Readable.from(request.data), createWriteStream(tempFile))
	return tempFile
}

/**
 * Download and extract a plugin
 *
 * @param root project path
 * @param name project name
 */
export const downloadAndExtractPlugin = async (root: string, name: string): Promise<boolean> => {

	const tempFile = await downloadTar()

	await tar.x({
		cwd: root,
		file: tempFile,
		filter: (p) => p.includes(`templates-main/${name}`),
		strip: 2,
	})

	await fs.unlink(tempFile)

	return true
}