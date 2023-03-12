import {expect, test} from '@oclif/test'

describe('finalize-withdrawal', () => {
  test
  .stdout()
  .command(['finalize-withdrawal'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['finalize-withdrawal', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
