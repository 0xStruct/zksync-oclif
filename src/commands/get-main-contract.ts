import { Args, Command, Flags, ux } from '@oclif/core'
import { Wallet, Provider, utils } from 'zksync-web3';
import { PriorityOpResponse } from 'zksync-web3/build/src/types';
import * as ethers from 'ethers';
import * as chalk from 'chalk';

export default class GetMainContract extends Command {
  static description = 'Get zkSync L1 smart contract'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
  }

  static args = {
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(GetMainContract)
    
    // hide input while typing
    const key = await ux.prompt('Private key of the signer', { type: 'hide' })

    this.log(
      chalk.magentaBright(`Getting zkSync L1 smart contract`)
    );

    // Initialize the wallet.
    const L1Provider = ethers.getDefaultProvider("goerli");
    const zkSyncProvider = new Provider("https://zksync2-testnet.zksync.dev");
    const wallet = new Wallet(key, zkSyncProvider, L1Provider);

    // get contract
    const mainContract = await wallet.getMainContract();
    this.log(
      chalk.magentaBright(
        `zkSync L1 smart contract: ${mainContract.address}`
      )
    );

    // ends
    this.exit(0);
  }
}
