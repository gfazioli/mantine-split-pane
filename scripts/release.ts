import chalk from 'chalk';
import { execa } from 'execa';
import fs from 'fs-extra';
import githubRelease from 'new-github-release-url';
import path from 'node:path';
import open from 'open';
import signale from 'signale';
import SimpleGit from 'simple-git';
import { VersionIncrement, VersionStage, getNextVersion } from 'version-next';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { run } from './run';
import { updateVersion } from './update-version';

function getRepositoryInfo(gitUrl: string) {
  const [user, repo] = gitUrl.replace('https://github.com/', '').replace('.git', '').split('/');
  return { user, repo };
}

const packageJsonPath = path.join(process.cwd(), 'package/package.json');
const packageJson = fs.readJsonSync(packageJsonPath);
const { argv } = yargs(hideBin(process.argv)) as any;
const git = SimpleGit();

const versionIncrement: VersionIncrement = argv._[0] || 'patch';
const versionStage: VersionStage | undefined = argv.stage;

async function release() {
  await run(git.pull(), {
    info: 'Pulling the latest changes from the remote repository',
    success: 'The latest changes have been pulled from the remote repository',
    error: 'Failed to pull the latest changes from the remote repository',
  });

  const gitStatus = await git.status();

  if (gitStatus.files.length > 0) {
    signale.error(
      'Working directory is not clean, commit all changes before publishing the package.'
    );

    process.exit(1);
  }

  const nextVersion = getNextVersion(packageJson.version, {
    type: versionIncrement,
    stage: versionStage,
  });

  signale.info(
    `Publishing next ${chalk.cyan(versionIncrement)} version of ${chalk.cyan(
      packageJson.name
    )} to npm.`
  );

  signale.info(
    `Current version: ${chalk.cyan(packageJson.version)}, next version: ${chalk.cyan(nextVersion)}`
  );

  await run(execa('yarn'), {
    info: 'Installing fresh dependencies',
    success: 'Fresh dependencies have been installed',
    error: 'Failed to install fresh dependencies',
  });

  await run(execa('yarn', ['run', 'clean']), {
    info: 'Removing dist directory',
    success: 'dist directory has been removed',
    error: 'Failed to remove dist directory',
  });

  await run(execa('yarn', ['run', 'build']), {
    info: 'Building the package',
    success: 'The package has been built',
    error: 'Failed to build the package',
  });

  await fs.copyFile(
    path.join(process.cwd(), 'README.md'),
    path.join(process.cwd(), 'package/README.md')
  );

  await fs.copyFile(
    path.join(process.cwd(), 'LICENSE'),
    path.join(process.cwd(), 'package/LICENSE')
  );

  const revertVersion = await updateVersion(nextVersion);

  await run(
    execa(
      'yarn',
      ['npm', 'publish', '--access', 'public', '--tag', versionStage ? 'next' : 'latest'],
      { cwd: path.join(process.cwd(), 'package') }
    ),
    {
      info: 'Publishing the package to npm',
      success: 'The package has been published to npm',
      error: 'Failed to publish the package to npm',
    },
    revertVersion
  );

  await git.add([packageJsonPath]);
  await git.commit(`Release ${nextVersion}`);
  await git.push();

  open(
    githubRelease({
      ...getRepositoryInfo(packageJson.repository.url),
      tag: nextVersion,
      title: nextVersion,
    })
  );
}

release();
