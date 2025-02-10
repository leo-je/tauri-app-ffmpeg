import { getOctokit, context } from '@actions/github';

async function run() {
    try {
        // 获取输入参数
        const github = getOctokit(process.env.GITHUB_TOKEN || '');
        const tagName = 'test-v1.1.1';
        const createdRelease = await github.rest.repos.createRelease({
            owner:'leo-je',
            repo:'test',
            tag_name: tagName,
            name: 'releaseName',
            body: 'test',
            draft:false,
            prerelease:false,
            target_commitish: context.sha,
        });
        console.log(createdRelease);
    } catch (error) {
        console.error(error)
    }
}

run();
