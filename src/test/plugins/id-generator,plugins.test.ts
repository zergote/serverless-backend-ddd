// id-generator.plugins.test.ts
import { idGeneratorPlugin } from '../../plugins/id-generator.plugin'

describe('IdGeneratorPlugin', () => {
  it('should generate a valid id', () => {
    const id = idGeneratorPlugin()
    console.log(id)
    expect(id).toBeDefined()
  })
})
