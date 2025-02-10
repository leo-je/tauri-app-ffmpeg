import { getOctokit, context } from '@actions/github';
import * as core from '@actions/core';

async function run() {
    try {
        // 获取输入参数
        if(!process.env.GITHUB_TOKEN){
            throw new Error('GITHUB_TOKEN is not set');
        }
        const github = getOctokit(process.env.GITHUB_TOKEN || '');
        const tagName = 'test-v1.1.1';
        const owner = core.getInput('owner') || context.repo.owner;
        const repo = core.getInput('repo') || context.repo.repo;
        const createdRelease = await github.rest.repos.createRelease({
            owner,
            repo,
            tag_name: tagName,
            name: 'releaseName',
            body: 'test',
            draft: false,
            prerelease: false,
            target_commitish: context.sha,
        });
        console.log(createdRelease);
    } catch (error: any) {
        console.error(error)
        core.setFailed(error['message'] + '');
    }
}

run();
