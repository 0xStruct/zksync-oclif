import { Args, Command, Flags, ux } from '@oclif/core'
import { Wallet, Provider, utils } from 'zksync-web3';
import { PriorityOpResponse } from 'zksync-web3/build/src/types';
import * as ethers from 'ethers';
import * as chalk from 'chalk';

export default class DepositApprove extends Command {
  static description = 'Approve ERC20 token deposit on L2'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
  }

  static args = {
  }

  // https://era.zksync.io/docs/api/js/accounts-l1-l2.html#approving-deposit-of-tokens
  public async run(): Promise<void> {
    const { args, flags } = await this.parse(DepositApprove)

    this.log(chalk.magentaBright("Approving ERC20 token deposit on L2"));

    // just prompt for input
    const token = await ux.prompt('ERC20 token address on L1')

    const amount = await ux.prompt('Amount of token')

    // hide input while typing
    const key = await ux.prompt('Private key of the approver', { type: 'hide' })

    this.log(
      chalk.magentaBright(`Approving ERC20 token: ${token}`)
    );

    // Initialize the wallet.
    const L1Provider = ethers.getDefaultProvider("goerli");
    const zkSyncProvider = new Provider("https://zksync2-testnet.zksync.dev");
    const wallet = new Wallet(key, zkSyncProvider, L1Provider);

    // Approve token
    const USDC_ADDRESS = "0xd35cceead182dcee0f148ebac9447da2c4d449c4";
    const txHandle = await wallet.approveERC20(
      token,
      amount
    );

    await txHandle.wait();

    this.log(chalk.magentaBright(`Transaction submitted`));
    this.log(
      chalk.magentaBright(`https://goerli.explorer.zksync.io/tx/${txHandle.hash}`)
    );

    // ends
    this.exit(0);
  }
}
