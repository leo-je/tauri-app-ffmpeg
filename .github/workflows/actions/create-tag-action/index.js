import { execSync } from 'child_process';
// import { GitHub } from '@actions/github/lib/utils';

async function run() {
  try {
    // 获取输入参数
    const tabName = 'test-v1.1.1';
    
    console.log(`Creating tag: ${tabName}`);

    // 配置 git 用户名和邮箱
    execSync('git config --global user.name "GitHub Actions"');
    execSync('git config --global user.email "github-actions[bot]@users.noreply.github.com"');

    // 创建新的标签
    execSync(`git tag ${tabName}`);
    console.log(`Tag created: ${tabName}`);

    // 推送标签到远程仓库
    execSync(`git push origin ${tabName}`);
    console.log(`Tag pushed to remote: ${tabName}`);
    
  } catch (error) {
    //setFailed(error.message);
  }
}

run();
