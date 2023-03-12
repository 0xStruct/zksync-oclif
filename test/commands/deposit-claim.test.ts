import {expect, test} from '@oclif/test'

describe('deposit-claim', () => {
  test
  .stdout()
  .command(['deposit-claim'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['deposit-claim', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
