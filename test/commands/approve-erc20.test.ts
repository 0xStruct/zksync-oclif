import {expect, test} from '@oclif/test'

describe('approve-erc20', () => {
  test
  .stdout()
  .command(['approve-erc20'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['approve-erc20', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
