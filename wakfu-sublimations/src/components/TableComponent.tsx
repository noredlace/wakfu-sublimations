import { DataTable, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, TableToolbar, TableToolbarSearch, TableToolbarContent, Button, Grid, Column, Select, SelectItem } from '@carbon/react'
import { useState } from 'react'
import sublimations from '../assets/data/sublimations.json'

// Helper function to get socket image based on letter
const getSocketImage = (socketLetter: string) => {
  switch (socketLetter) {
    case 'G':
      return '/src/assets/images/GreenSocket.png';
    case 'R':
      return '/src/assets/images/RedSocket.png';
    case 'B':
      return '/src/assets/images/BlueSocket.png';
    case 'Y':
      return '/src/assets/images/YellowSocket.png';
    default:
      return null;
  }
};

// Helper function to render socket cell content
const renderSocketCell = (value: string) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      {value.split('').map((char, index) => {
        const imagePath = getSocketImage(char);
        if (imagePath) {
          return (
            <img 
              key={index}
              src={imagePath} 
              alt={`${char} Socket`} 
              style={{ width: '20px', height: '20px' }}
              title={`${char} Socket`}
            />
          );
        }
        return (
          <span key={index} style={{ fontSize: '12px', color: '#666' }}>
            {char}
          </span>
        );
      })}
    </div>
  );
};

// Socket order filter component
const SocketOrderFilter = ({ 
  socketOrder, 
  onSocketOrderChange, 
  onReset 
}: {
  socketOrder: string[];
  onSocketOrderChange: (index: number, value: string) => void;
  onReset: () => void;
}) => {
  const socketOptions = [
    { value: '', text: 'Any Color' },
    { value: 'R', text: 'Red' },
    { value: 'B', text: 'Blue' },
    { value: 'G', text: 'Green' },
    { value: 'Y', text: 'Yellow (Wild)' }
  ];

  return (
    <div style={{ 
      padding: '1rem', 
      backgroundColor: '#f4f4f4', 
      marginBottom: '1rem',
      borderRadius: '4px'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0 }}>Sublimations</h3>
        <a 
          href="https://www.wakfu.com/en/forum/143-guides/241241-updated-sublimations" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            color: '#0f62fe',
            textDecoration: 'none',
            fontSize: '0.875rem'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8.5 1.5a.5.5 0 0 0-1 0V8a.5.5 0 0 0 .147.354l2.5 2.5a.5.5 0 0 0 .708-.708L8.5 8.707V1.5z"/>
            <path d="M8 0a8 8 0 1 0 8 8 8 8 0 0 0-8-8z"/>
          </svg>
          Data Source
        </a>
      </div>
      <Grid>
        {socketOrder.map((socket, index) => (
          <Column lg={3} md={6} sm={4} key={index}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px',
              padding: '8px',
              border: '1px solid #e0e0e0',
              borderRadius: '4px',
              backgroundColor: socket ? '#f0f8ff' : '#ffffff'
            }}>
              <div style={{ position: 'relative' }}>
                <div style={{
                  backgroundColor: '#0f62fe',
                  color: 'white',
                  borderRadius: '50%',
                  width: '20px',
                  height: '20px',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold'
                }}>
                  {index + 1}
                </div>
              </div>
              <Select
                id={`socket-${index}`}
                labelText=""
                value={socket}
                onChange={(e) => onSocketOrderChange(index, e.target.value)}
                size="sm"
              >
                {socketOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value} text={option.text} />
                ))}
              </Select>
              {socket && getSocketImage(socket) && (
                <img 
                  src={getSocketImage(socket)!} 
                  alt={`${socket} Socket`} 
                  style={{ width: '20px', height: '20px' }}
                  title={`${socket} Socket`}
                />
              )}
            </div>
          </Column>
        ))}
      </Grid>
      
      <div style={{ marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Button onClick={onReset} kind="secondary" size="sm">
          Reset Socket Order
        </Button>
      </div>
    </div>
  );
};

const rows = sublimations.map((sublimation) => ({
    id: sublimation.Name,
    name: sublimation.Name,
    socket: sublimation.Socket1 + sublimation.Socket2 + sublimation.Socket3,
    socket1: sublimation.Socket1,
    socket2: sublimation.Socket2,
    socket3: sublimation.Socket3,
    tier1: sublimation.Tier1,
    tier2: sublimation.Tier2,
    tier3: sublimation.Tier3,
    maxLevel: sublimation.MaxLevel,
    obtainedFrom: sublimation.ObtainedFrom,
    sincePatch: sublimation.SincePatch,
    notes: sublimation.Notes
})).sort((a, b) => a.name.localeCompare(b.name));

const headers = [
  {
    key: 'name',
    header: 'Name',
  },
  {
      key: 'socket',
      header: 'Socket',
  },
  {
      key: 'tier1',
      header: 'Tier 1',
  },
  {
      key: 'tier2',
      header: 'Tier 2',
  },
  {
      key: 'tier3',
      header: 'Tier 3',
  },
  {
      key: 'maxLevel',
      header: 'Max Level',
  },
  {
      key: 'obtainedFrom',
      header: 'Obtained From',
  },
  {
      key: 'sincePatch',
      header: 'Since Patch',
  },
  {
      key: 'notes',
      header: 'Notes',
  }
];

export default function TableComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [socketOrder, setSocketOrder] = useState<string[]>(['', '', '', '']);

  // Helper function to check if a socket pattern matches
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

  // Apply both search and socket order filters
  const filteredRows = rows.filter(sublimation => {
    // Text search filter
    const searchMatch = 
      sublimation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sublimation.socket.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sublimation.tier1.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sublimation.tier2.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sublimation.tier3.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sublimation.maxLevel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sublimation.obtainedFrom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sublimation.sincePatch.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sublimation.notes.toLowerCase().includes(searchTerm.toLowerCase());

    if (!searchMatch) return false;

    // Socket order filter - check if any socket order filters are set
    const hasSocketOrderFilters = socketOrder.some(filter => filter !== '');
    if (!hasSocketOrderFilters) return true;

    // Get the non-empty filters
    const activeFilters = socketOrder.filter(filter => filter !== '');
    
    // Get the sublimation's socket order
    const sublimationSocketOrder = [sublimation.socket1, sublimation.socket2, sublimation.socket3];
    
    // We need at least 3 out of 4 filters to match (or all active filters if less than 4)
    const minRequiredMatches = Math.min(3, activeFilters.length);
    
    // Check if any valid 3-color combination exists
    // For RRBB, we need to check if RRB or RBB can be found in the sublimation
    
    // Try to find any valid 3-color combination
    for (let startPos = 0; startPos <= sublimationSocketOrder.length - minRequiredMatches; startPos++) {
      let filterIndex = 0;
      let sublimationIndex = startPos;
      let currentMatchCount = 0;
      
      while (filterIndex < activeFilters.length && sublimationIndex < sublimationSocketOrder.length) {
        const currentFilter = activeFilters[filterIndex];
        const currentSublimationSocket = sublimationSocketOrder[sublimationIndex];
        
        // Yellow (Y) is wild and matches any color
        if (currentFilter === 'Y') {
          filterIndex++;
          sublimationIndex++;
          currentMatchCount++;
          continue;
        }
        
        // Check if the current socket matches the current filter
        if (currentFilter === currentSublimationSocket) {
          filterIndex++;
          sublimationIndex++;
          currentMatchCount++;
        } else {
          // Move to next sublimation socket to try to match
          sublimationIndex++;
        }
      }
      
      // If we found enough matches, this row qualifies
      if (currentMatchCount >= minRequiredMatches) {
        return true;
      }
    }
    
    // Also check for overlapping patterns (like RRB and RBB from RRBB)
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
    }
    
    return false;
  });

  const handleSocketOrderChange = (index: number, value: string) => {
    const newSocketOrder = [...socketOrder];
    newSocketOrder[index] = value;
    setSocketOrder(newSocketOrder);
  };

  const resetSocketOrder = () => {
    setSocketOrder(['', '', '', '']);
  };

  return (
    <>
      {/* Socket Order Filter */}
      <SocketOrderFilter
        socketOrder={socketOrder}
        onSocketOrderChange={handleSocketOrderChange}
        onReset={resetSocketOrder}
      />

      {/* DataTable */}
      <DataTable rows={filteredRows} headers={headers}>
        {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
          <>
            <TableToolbar>
              <TableToolbarContent>
                <TableToolbarSearch
                  persistent={true}
                  placeholder="Search sublimations..."
                  onChange={(e) => {
                    if (typeof e === 'string') {
                      setSearchTerm(e);
                    } else if (e && typeof e === 'object' && 'target' in e) {
                      setSearchTerm(e.target.value);
                    }
                  }}
                  value={searchTerm}
                />
              </TableToolbarContent>
            </TableToolbar>
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow {...getRowProps({ row })}>
                    {row.cells.map((cell, cellIndex) => {
                      // Get the header key for this cell
                      const headerKey = headers[cellIndex]?.key;
                      
                      return (
                        <TableCell key={cell.id}>
                          {/* Custom rendering for socket columns */}
                          {headerKey === 'socket' 
                            ? renderSocketCell(cell.value)
                            : cell.value
                          }
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </DataTable>
    </>
  )
}
