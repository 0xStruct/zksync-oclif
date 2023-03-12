import { Args, Command, Flags, ux } from '@oclif/core'
import { Wallet, Provider, utils } from 'zksync-web3';
import { PriorityOpResponse } from 'zksync-web3/build/src/types';
import * as ethers from 'ethers';
import * as chalk from 'chalk';

export default class Withdraw extends Command {
  static description = 'Withdraw funds from L2 to L1'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
  }

  static args = {
  }

  public async run(): Promise<void> {
    this.log(chalk.magentaBright('Withdraw funds from L2 to L1'));

    // just prompt for input
    const to = await ux.prompt('Address to deposit funds to')

    const amount = await ux.prompt('Amount in ETH')

    // hide input while typing
    const key = await ux.prompt('Private key of the sender', { type: 'hide' })

    this.log(
      chalk.magentaBright(`Withdrawing ${amount}ETH to ${to}`)
    );

    // Initialize the wallet.
    const L1Provider = ethers.getDefaultProvider('goerli');
    const zkSyncProvider = new Provider('https://zksync2-testnet.zksync.dev');
    const wallet = new Wallet(key, zkSyncProvider, L1Provider);

    // Withdraw funds to L1
    const withdrawHandle = await wallet.withdraw({
      to: to,
      token: utils.ETH_ADDRESS,
      amount: ethers.utils.parseEther(amount),
    });

    this.log(chalk.magentaBright(`Transaction submitted 💸💸💸`));
    this.log(
      chalk.magentaBright(
        `https://goerli.explorer.zksync.io/tx/${withdrawHandle.hash}`
      )
    );
    this.log(
      chalk.magentaBright(
        `Your funds will be available in L1 in a couple of minutes.`
      )
    );
    this.log(
      chalk.magentaBright(
        `To check the latest transactions of this wallet on zkSync, visit: https://goerli.explorer.zksync.io/address/${to}`
      )
    );

    // ends
    this.exit(0);
  }
}
