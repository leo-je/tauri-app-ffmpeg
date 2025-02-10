import { getOctokit, context } from '@actions/github';
import { Github } from '@actions/github/lib/utils';

async function run() {
    try {
        // 获取输入参数
        const github = getOctokit(process.env.GITHUB_TOKEN);
        const tagName = 'test-v1.1.1';
        const createdRelease = await github.rest.repos.createRelease({
            owner:'owb',
            repo:'test',
            tag_name: tagName,
            name: 'releaseName',
            body: 'test',
            draft:false,
            prerelease:false,
            target_commitish: commitish || context.sha,
        });

        release = createdRelease.data;

    } catch (error) {
        //setFailed(error.message);
    }
}

run();
