import { Args, Command, Flags, ux } from '@oclif/core'
import { Wallet, Provider, utils } from 'zksync-web3';
import { PriorityOpResponse } from 'zksync-web3/build/src/types';
import * as ethers from 'ethers';
import * as chalk from 'chalk';

export default class GetNonce extends Command {
  static description = 'Getting nonce (aka transaction count) for the signer'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
  }

  static args = {
  }

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(GetNonce)

    // hide input while typing
    const key = await ux.prompt('Private key of the signer', { type: 'hide' })

    this.log(
      chalk.magentaBright(`Getting nonce for the signer`)
    );

    // Initialize the wallet.
    const L1Provider = ethers.getDefaultProvider("goerli");
    const zkSyncProvider = new Provider("https://zksync2-testnet.zksync.dev");
    const wallet = new Wallet(key, zkSyncProvider, L1Provider);

    // get contract
    const nonce = await wallet.getNonce();
    this.log(
      chalk.magentaBright(
        `Nonce: ${nonce}`
      )
    );
    
    // ends
    this.exit(0);
  }
}
