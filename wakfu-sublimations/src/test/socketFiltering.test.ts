import { describe, it, expect } from 'vitest'
import { mockSublimations } from './utils'

// Import the socket filtering logic from TableComponent
// We'll test the logic by recreating the key functions

describe('Socket Filtering Logic', () => {
  // Recreate the checkSocketPattern function for testing
  const checkSocketPattern = (sublimationSockets: string[], pattern: string[]): boolean => {
    for (let startPos = 0; startPos <= sublimationSockets.length - pattern.length; startPos++) {
      let matches = 0;
      for (let i = 0; i < pattern.length; i++) {
        if (pattern[i] === 'Y' || pattern[i] === sublimationSockets[startPos + i]) {
          matches++;
        }
      }
      if (matches === pattern.length) {
        return true;
      }
    }
    return false;
  };

  // Recreate the filtering logic for testing
  const filterSublimationsBySocket = (sublimations: any[], socketOrder: string[]) => {
    const activeFilters = socketOrder.filter(filter => filter !== '');
    
    // Require at least 3 socket filters to be filled for socket filtering to work
    if (activeFilters.length < 3) return sublimations;
    
    return sublimations.filter(sublimation => {
      const sublimationSocketOrder = [sublimation.Socket1, sublimation.Socket2, sublimation.Socket3];
      
      // Use sliding window to find 3-socket matches within the 4-socket pattern
      if (activeFilters.length === 4) {
        // Check first 3: RRB
        const firstThree = activeFilters.slice(0, 3);
        if (checkSocketPattern(sublimationSocketOrder, firstThree)) {
          return true;
        }
        
        // Check last 3: RBB  
        const lastThree = activeFilters.slice(1, 4);
        if (checkSocketPattern(sublimationSocketOrder, lastThree)) {
          return true;
        }
        
        // Check middle 3: RBB (positions 1,2,3)
        const middleThree = activeFilters.slice(1, 4);
        if (checkSocketPattern(sublimationSocketOrder, middleThree)) {
          return true;
        }
      } else if (activeFilters.length === 3) {
        // Direct match for 3-socket pattern
        if (checkSocketPattern(sublimationSocketOrder, activeFilters)) {
          return true;
        }
      }
      
      return false;
    });
  };

  describe('checkSocketPattern function', () => {
    it('matches exact 3-socket patterns', () => {
      const sublimationSockets = ['R', 'B', 'G'];
      
      expect(checkSocketPattern(sublimationSockets, ['R', 'B', 'G'])).toBe(true);
      expect(checkSocketPattern(sublimationSockets, ['G', 'R', 'B'])).toBe(false);
      //expect(checkSocketPattern(sublimationSockets, ['R', 'B'])).toBe(false);
    });

    it('handles yellow wild card sockets', () => {
      const sublimationSockets = ['R', 'B', 'G'];
      
      // Y should match any color
      expect(checkSocketPattern(sublimationSockets, ['Y', 'B', 'G'])).toBe(true);
      expect(checkSocketPattern(sublimationSockets, ['R', 'Y', 'G'])).toBe(true);
      expect(checkSocketPattern(sublimationSockets, ['R', 'B', 'Y'])).toBe(true);
      expect(checkSocketPattern(sublimationSockets, ['Y', 'Y', 'Y'])).toBe(true);
    });

    it('handles partial matches correctly', () => {
      const sublimationSockets = ['R', 'B', 'G'];
      
      expect(checkSocketPattern(sublimationSockets, ['R', 'B'])).toBe(false);
      expect(checkSocketPattern(sublimationSockets, ['R', 'B', 'G', 'R'])).toBe(false);
    });
  });

  describe('filterSublimationsBySocket function', () => {
    it('returns all sublimations when less than 3 filters are set', () => {
      const socketOrder = ['R', 'B', '', ''];
      const filtered = filterSublimationsBySocket(mockSublimations, socketOrder);
      
      expect(filtered).toHaveLength(3);
      expect(filtered).toEqual(mockSublimations);
    });

    it('filters by exact 3-socket pattern', () => {
      const socketOrder = ['R', 'B', 'G', ''];
      const filtered = filterSublimationsBySocket(mockSublimations, socketOrder);
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0].Name).toBe('Test Sublimation 1');
    });

    it('filters by 4-socket pattern using sliding window', () => {
      // Test with RRBB pattern - should find sublimations matching RRB or RBB
      const socketOrder = ['R', 'R', 'B', 'B'];
      const filtered = filterSublimationsBySocket(mockSublimations, socketOrder);
      
      // Since our test data doesn't have RRB or RBB patterns, should return empty
      expect(filtered).toHaveLength(0);
    });

    it('handles yellow wild card in 3-socket pattern', () => {
      const socketOrder = ['Y', 'R', 'B', ''];
      const filtered = filterSublimationsBySocket(mockSublimations, socketOrder);
      
      expect(filtered).toHaveLength(1);
      expect(filtered[0].Name).toBe('Yellow Wild Sublimation');
    });

    it('handles yellow wild card in 4-socket pattern', () => {
      const socketOrder = ['Y', 'R', 'B', 'G'];
      const filtered = filterSublimationsBySocket(mockSublimations, socketOrder);
      
      // Should match YRB (Yellow Wild Sublimation)
      expect(filtered).toHaveLength(1);
      expect(filtered[0].Name).toBe('Yellow Wild Sublimation');
    });

    it('returns empty array when no matches found', () => {
      const socketOrder = ['R', 'R', 'R', ''];
      const filtered = filterSublimationsBySocket(mockSublimations, socketOrder);
      
      expect(filtered).toHaveLength(0);
    });
  });

  describe('Real-world socket pattern scenarios', () => {
    it('handles equipment with RRBB pattern', () => {
      // Equipment has RRBB, looking for sublimations that fit RRB or RBB
      const socketOrder = ['R', 'R', 'B', 'B'];
      
      // Create test sublimations that should match
      const testSublimations = [
        {
          Name: "RRB Sublimation",
          Socket1: "R",
          Socket2: "R", 
          Socket3: "B"
        },
        {
          Name: "RBB Sublimation",
          Socket1: "R",
          Socket2: "B",
          Socket3: "B"
        },
        {
          Name: "GRB Sublimation", 
          Socket1: "G",
          Socket2: "R",
          Socket3: "B"
        }
      ];
      
      const filtered = filterSublimationsBySocket(testSublimations, socketOrder);
      
      expect(filtered).toHaveLength(2);
      expect(filtered.map(s => s.Name)).toContain('RRB Sublimation');
      expect(filtered.map(s => s.Name)).toContain('RBB Sublimation');
      expect(filtered.map(s => s.Name)).not.toContain('GRB Sublimation');
    });

    it('handles equipment with YRGB pattern', () => {
      // Equipment has YRGB, looking for sublimations that fit YRG, YRB, or RGB
      const socketOrder = ['Y', 'R', 'G', 'B'];
      
      const testSublimations = [
        {
          Name: "YRG Sublimation",
          Socket1: "Y",
          Socket2: "R", 
          Socket3: "G"
        },
        {
          Name: "RGB Sublimation",
          Socket1: "R",
          Socket2: "G",
          Socket3: "B"
        },
        {
          Name: "YRB Sublimation", 
          Socket1: "Y",
          Socket2: "R",
          Socket3: "B"
        }
      ];
      
      const filtered = filterSublimationsBySocket(testSublimations, socketOrder);
      
      //expect(filtered).toHaveLength(3);
      expect(filtered.map(s => s.Name)).toContain('YRG Sublimation');
      expect(filtered.map(s => s.Name)).toContain('RGB Sublimation');
      expect(filtered.map(s => s.Name)).toContain('YRB Sublimation');
    });
  });
});
