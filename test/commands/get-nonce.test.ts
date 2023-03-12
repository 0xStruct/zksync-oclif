import {expect, test} from '@oclif/test'

describe('get-nonce', () => {
  test
  .stdout()
  .command(['get-nonce'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['get-nonce', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
