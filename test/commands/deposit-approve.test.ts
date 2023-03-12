import {expect, test} from '@oclif/test'

describe('deposit-approve', () => {
  test
  .stdout()
  .command(['deposit-approve'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['deposit-approve', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
