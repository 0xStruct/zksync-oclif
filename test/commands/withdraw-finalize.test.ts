import {expect, test} from '@oclif/test'

describe('withdraw-finalize', () => {
  test
  .stdout()
  .command(['withdraw-finalize'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['withdraw-finalize', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
