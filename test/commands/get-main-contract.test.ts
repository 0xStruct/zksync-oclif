import {expect, test} from '@oclif/test'

describe('get-main-contract', () => {
  test
  .stdout()
  .command(['get-main-contract'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['get-main-contract', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
