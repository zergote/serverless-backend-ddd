// id-generator.plugins.test.ts
import { idGeneratorPlugin } from '../../plugins/id-generator.plugin'

describe('IdGeneratorPlugin', () => {
  it('should generate a valid id', () => {
    const id = idGeneratorPlugin()
    expect(id).toBeDefined()
  })

  it('Length of the id should be 36', () => {
    const id = idGeneratorPlugin()
    expect(id.length).toBe(36)
  })
})
