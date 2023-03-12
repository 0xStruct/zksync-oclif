import {expect, test} from '@oclif/test'

describe('get-balance-l1', () => {
  test
  .stdout()
  .command(['get-balance-l1'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['get-balance-l1', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
