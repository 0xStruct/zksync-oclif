import { Args, Command, Flags, ux } from '@oclif/core'
import { Wallet, Provider, utils } from 'zksync-web3';
import { PriorityOpResponse } from 'zksync-web3/build/src/types';
import * as ethers from 'ethers';
import * as chalk from 'chalk';

export default class GetBalance extends Command {
  static description = 'Transfer from an account to another within L2'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
  }

  static args = {
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(GetBalance)

    // just prompt for input
    const to = await ux.prompt('Address to deposit funds to')

    const amount = await ux.prompt('Amount in ETH')

    // hide input while typing
    const key = await ux.prompt('Private key of the signer', { type: 'hide' })

    this.log(
      chalk.magentaBright(`Transferring ${amount}ETH to ${to} within L2`)
    );

    // Initialize the wallet.
    const L1Provider = ethers.getDefaultProvider("goerli");
    const zkSyncProvider = new Provider("https://zksync2-testnet.zksync.dev");
    const wallet = new Wallet(key, zkSyncProvider, L1Provider);

    // transfer
    const transferHandle = await wallet.transfer({
      to: to,
      token: utils.ETH_ADDRESS,
      amount: ethers.utils.parseEther(amount),
    });
    this.log(chalk.magentaBright(`Transaction submitted 💸💸💸`));
    this.log(
      chalk.magentaBright(`https://goerli.explorer.zksync.io/tx/${transferHandle.hash}`)
    );
    this.log(
      chalk.magentaBright(
        `Your funds will be transferred in a bit.`
      )
    );
    this.log(
      chalk.magentaBright(
        `To check the latest transactions of recipient wallet on zkSync, visit: https://goerli.explorer.zksync.io/address/${to}`
      )
    );
    
    // ends
    this.exit(0);
  }
}
