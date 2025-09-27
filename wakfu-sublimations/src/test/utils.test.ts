import { describe, it, expect } from 'vitest'
import { mockSublimations, testSocketPatterns } from './utils'

describe('Test Utilities', () => {
  describe('mockSublimations', () => {
    it('contains valid sublimation data', () => {
      expect(mockSublimations).toHaveLength(3)
      
      // Check first sublimation
      const firstSublimation = mockSublimations[0]
      expect(firstSublimation.Name).toBe('Test Sublimation 1')
      expect(firstSublimation.Socket1).toBe('R')
      expect(firstSublimation.Socket2).toBe('B')
      expect(firstSublimation.Socket3).toBe('G')
      expect(firstSublimation.Tier1).toBe('Test tier 1 effect [+1]')
      expect(firstSublimation.MaxLevel).toBe('[6]')
      expect(firstSublimation.ObtainedFrom).toBe('Test Source')
      expect(firstSublimation.SincePatch).toBe('1.84')
      expect(firstSublimation.Notes).toBe('Test notes')
    })

    it('contains sublimation with yellow wild socket', () => {
      const yellowSublimation = mockSublimations[2]
      expect(yellowSublimation.Name).toBe('Yellow Wild Sublimation')
      expect(yellowSublimation.Socket1).toBe('Y')
      expect(yellowSublimation.Socket2).toBe('R')
      expect(yellowSublimation.Socket3).toBe('B')
    })

    it('has different socket patterns for testing', () => {
      const patterns = mockSublimations.map(s => [s.Socket1, s.Socket2, s.Socket3])
      expect(patterns).toEqual([
        ['R', 'B', 'G'],
        ['G', 'R', 'B'],
        ['Y', 'R', 'B']
      ])
    })
  })

  describe('testSocketPatterns', () => {
    it('contains various socket pattern combinations', () => {
      expect(testSocketPatterns.redBlueGreen).toEqual(['R', 'B', 'G'])
      expect(testSocketPatterns.greenRedBlue).toEqual(['G', 'R', 'B'])
      expect(testSocketPatterns.yellowRedBlue).toEqual(['Y', 'R', 'B'])
      expect(testSocketPatterns.redRedBlue).toEqual(['R', 'R', 'B'])
      expect(testSocketPatterns.redRedBlueBlue).toEqual(['R', 'R', 'B', 'B'])
    })

    it('includes 4-socket patterns for testing sliding window', () => {
      expect(testSocketPatterns.redRedBlueBlue).toHaveLength(4)
    })

    it('includes patterns with yellow wild cards', () => {
      expect(testSocketPatterns.yellowRedBlue).toContain('Y')
    })
  })
})
