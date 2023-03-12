import { Args, Command, Flags } from '@oclif/core'
import * as chalk from 'chalk'
import { execSync } from 'child_process'

/**
 * Runs CLI commands
 * @param {*} command String command to run
 */
const runCommand = (command: string) => {
  try {
    // runs given command and prints its output to console
    execSync(`${command}`, { stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to run command: ', error);
    return false;
  }
  return true;
};

export default class Create extends Command {
  static description = 'Create a zkSync Era starter project'

  static examples = [
    '<%= config.bin %> <%= command.id %> test-project',
  ]

  static flags = {
  }

  static args = {
    projectName: Args.string({ description: 'project name to be created', required: true }),
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Create)

    const projectName = args.projectName

    // clones repo inside the given project name folder
    const cloneGitTemplate = `git clone https://github.com/matter-labs/zksync-hardhat-template ${projectName}`;

    // changes dir and installs deps with Yarn
    const installDeps = `cd ${projectName} && yarn`;

    const cleanup = `cd ${projectName} && rm -f -r .git`;

    this.log(chalk.magentaBright('Creating a zkSync - Hardhat project...'));

    this.log(
      chalk.magentaBright(`Initialising project with name ${projectName}`)
    );

    const cloned = runCommand(cloneGitTemplate);

    if (!cloned) this.exit(-1);
    const cleaned = runCommand(cleanup);
    if (!cleaned) this.exit(-1);

    this.log(chalk.magentaBright('Installing dependencies with yarn...'));

    const depsInstalled = runCommand(installDeps);
    if (!depsInstalled) this.exit(-1);

    this.log(chalk.magentaBright('Dependencies installed'));

    this.log(
      `All ready! Run cd ${projectName} to enter your project folder.

      Contracts are stored in the /contracts folder.
      Deployment scripts go in the /deploy folder.

      Run ${chalk.magentaBright('yarn hardhat compile')} to compile your contracts.
      Run ${chalk.magentaBright(
        'yarn hardhat deploy-zksync'
      )} to deploy your contract (this command accepts a --script option).

      Run ${chalk.magentaBright('git init')} to initialise a new repository.

      Read the README file to learn more.`
    );
  }
}
