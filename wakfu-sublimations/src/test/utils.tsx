import React from 'react'
import { render } from '@testing-library/react'

// Mock sublimations data for testing
export const mockSublimations = [
  {
    Name: "Test Sublimation 1",
    Socket1: "R",
    Socket2: "B",
    Socket3: "G",
    Tier1: "Test tier 1 effect [+1]",
    Tier2: "Test tier 2 effect [+2]",
    Tier3: "Test tier 3 effect [+3]",
    MaxLevel: "[6]",
    ObtainedFrom: "Test Source",
    SincePatch: "1.84",
    Notes: "Test notes"
  },
  {
    Name: "Test Sublimation 2",
    Socket1: "G",
    Socket2: "R",
    Socket3: "B",
    Tier1: "Another tier 1 effect [+1]",
    Tier2: "Another tier 2 effect [+2]",
    Tier3: "Another tier 3 effect [+3]",
    MaxLevel: "[4]",
    ObtainedFrom: "Another Source",
    SincePatch: "1.85",
    Notes: "Another test note"
  },
  {
    Name: "Yellow Wild Sublimation",
    Socket1: "Y",
    Socket2: "R",
    Socket3: "B",
    Tier1: "Yellow wild effect [+1]",
    Tier2: "Yellow wild effect [+2]",
    Tier3: "Yellow wild effect [+3]",
    MaxLevel: "[6]",
    ObtainedFrom: "Wild Source",
    SincePatch: "1.86",
    Notes: "Wild card test"
  }
]

// Custom render function with providers
export function renderWithProviders(ui: React.ReactElement) {
  return render(ui)
}

// Test socket patterns
export const testSocketPatterns = {
  redBlueGreen: ['R', 'B', 'G'],
  greenRedBlue: ['G', 'R', 'B'],
  yellowRedBlue: ['Y', 'R', 'B'],
  redRedBlue: ['R', 'R', 'B'],
  redRedBlueBlue: ['R', 'R', 'B', 'B']
}
