import { Args, Command, Flags, ux } from '@oclif/core'
import { Wallet, Provider, utils } from 'zksync-web3';
import { PriorityOpResponse } from 'zksync-web3/build/src/types';
import * as ethers from 'ethers';
import * as chalk from 'chalk';

export default class GetBalanceL1 extends Command {
  static description = 'Get specific token balance on L1'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
  }

  static args = {
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(GetBalanceL1)

    // token address
    const token = await ux.prompt('Token address on L1', { default: '0x0000000000000000000000000000000000000000'})

    // hide input while typing
    const key = await ux.prompt('Private key of the signer', { type: 'hide' })

    this.log(
      chalk.magentaBright(`Getting balance on L1 for token: ${token}`)
    );

    // Initialize the wallet.
    const L1Provider = ethers.getDefaultProvider("goerli");
    const zkSyncProvider = new Provider("https://zksync2-testnet.zksync.dev");
    const wallet = new Wallet(key, zkSyncProvider, L1Provider);

    // get contract
    const balance = await wallet.getBalanceL1();
    this.log(
      chalk.magentaBright(
        `Balance for token ${token}:\n${balance} / 10^18`
      )
    );

    // ends
    this.exit(0);
  }
}
