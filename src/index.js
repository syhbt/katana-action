import * as core from '@actions/core';
import * as exec from '@actions/exec';
import * as installer from './installer';
import { parseFlagsToArray } from './utils';

const target = core.getInput('target', { required: false });
const urls = core.getInput('urls', { required: false });
const duration = core.getInput('duration', {required: false});
const fieldScope = core.getInput('field-scope', {required: false});
const crawlScope = core.getInput('crawl-scope', {required: false});
const outScope = core.getInput('out-scope', {required: false});
const noScope = core.getBooleanInput('no-scope', {required: false});
const extensionFilter = core.getInput('extension-filter', {required: false});
const depth = core.getInput('depth', {required: false});
const delay = core.getInput('delay', {required: false});
const headless = core.getInput('headless', {required: false});
const config = core.getInput('config', { required: false });
const header = core.getInput('header', { required: false });
const flags = core.getInput('flags', { required: false });
const output = core.getInput('output', { required: false });

const json = core.getBooleanInput('json', { required: false })

let execOutput = '';
let execError = '';

const options = {};
options.listeners = {
  stdout: (data) => {
    execOutput += data.toString();
  },
  stderr: (data) => {
    execError += data.toString();
  }
};

async function run() {
	try {
		// download and install
		const binPath = await installer.downloadAndInstall();
    const params = [];

    if (!target && !urls) {
      core.setFailed('You need to set a target or provide a list of urls for Katana.');
      return
    }

    // Setting up params
    if (target) params.push(`-u=${target}`);
    if (urls) params.push(`-list=${urls}`);
    if (duration) params.push(`-ct={duration}`);
    if (fieldScope) params.push(`-fs=${fieldScope}`);
    if (crawlScope) params.push(`-cs=${crawlScope}`);
    if (outScope) params.push(`-cos=${outScope}`);
    if (noScope) param.push('-ns');
    if (extensionFilter) param.push(`-ef={extension-filter}`);
    if (delay) param.push(`-rd={delay}`);
    if (headless) params.push('-headless');
    if (config) params.push(`-config=${config}`);
    if (header) params.push(`-H=${header}`);
    params.push(`-o=${ output ? output : 'katana.log' }`);

    if (json) params.push('-j');

    if (flags) params.push(...parseFlagsToArray(flags));

		// run tool
    exec.exec(binPath, params, options);
	} catch (error) {
		core.setFailed(error.message);
	}
}

run();
