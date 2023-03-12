import { Args, Command, Flags, ux } from '@oclif/core'
import { Wallet, Provider, utils } from 'zksync-web3';
import { PriorityOpResponse } from 'zksync-web3/build/src/types';
import * as ethers from 'ethers';
import * as chalk from 'chalk';

export default class DepositClaim extends Command {
  static description = 'Calim failed deposit back to L1'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
  }

  static args = {
  }

  // https://era.zksync.io/docs/api/js/accounts-l1-l2.html#claim-failed-deposit
  public async run(): Promise<void> {
    const { args, flags } = await this.parse(DepositClaim)

    this.log(chalk.magentaBright("Calim failed deposit back to L1"));

    // just prompt for input
    const hash = await ux.prompt('Failed desposit TX hash on L2')

    // hide input while typing
    const key = await ux.prompt('Private key of the claimer', { type: 'hide' })

    this.log(
      chalk.magentaBright(`Claiming failed deposit TX: ${hash}`)
    );

    // Initialize the wallet.
    const L1Provider = ethers.getDefaultProvider("goerli");
    const zkSyncProvider = new Provider("https://zksync2-testnet.zksync.dev");
    const wallet = new Wallet(key, zkSyncProvider, L1Provider);

    // claimFailedDeposit
    const txHandle = await wallet.claimFailedDeposit(
      hash
    );

    this.log(chalk.magentaBright(`Transaction submitted`));
    this.log(
      chalk.magentaBright(`https://goerli.etherscan.io/tx/${txHandle.hash}`)
    );

    // ends
    this.exit(0);
  }
}