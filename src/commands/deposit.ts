import { Args, Command, Flags, ux } from '@oclif/core'
import { Wallet, Provider, utils } from 'zksync-web3';
import { PriorityOpResponse } from 'zksync-web3/build/src/types';
import * as ethers from 'ethers';
import * as chalk from 'chalk';

export default class Deposit extends Command {
  static description = 'Deposit funds from L1 to L2'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
  }

  static args = {
  }

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Deposit)

    this.log(chalk.magentaBright("Deposit funds from L1 to L2"));

    // just prompt for input
    const to = await ux.prompt('Address to deposit funds to')

    const amount = await ux.prompt('Amount in ETH')

    // hide input while typing
    const key = await ux.prompt('Private key of the sender', { type: 'hide' })

    this.log(
      chalk.magentaBright(`Depositing ${amount}ETH to ${to}`)
    );

    // Initialize the wallet.
    const L1Provider = ethers.getDefaultProvider("goerli");
    const zkSyncProvider = new Provider("https://zksync2-testnet.zksync.dev");
    const wallet = new Wallet(key, zkSyncProvider, L1Provider);

    // Deposit funds to L2
    const depositHandle: PriorityOpResponse = await wallet.deposit({
      to: to,
      token: utils.ETH_ADDRESS,
      amount: ethers.utils.parseEther(amount),
    });

    this.log(chalk.magentaBright(`Transaction submitted 💸💸💸`));
    this.log(
      chalk.magentaBright(`https://goerli.etherscan.io/tx/${depositHandle.hash}`)
    );
    this.log(
      chalk.magentaBright(
        `Your funds will be available in zkSync in a couple of minutes.`
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
