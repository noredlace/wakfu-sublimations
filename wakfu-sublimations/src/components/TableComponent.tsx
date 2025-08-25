import { DataTable, Table, TableHead, TableRow, TableHeader, TableBody, TableCell, TableToolbar, TableToolbarSearch, TableToolbarContent } from '@carbon/react'
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

const rows = sublimations.map((sublimation) => ({
    id: sublimation.Name,
    name: sublimation.Name,
    socket: sublimation.Socket1 + sublimation.Socket2 + sublimation.Socket3,
    socket1: sublimation.Socket1,
    socket1Value: sublimation.Socket1Value,
    socket2: sublimation.Socket2,
    socket2Value: sublimation.Socket2Value,
    socket3: sublimation.Socket3,
    socket3Value: sublimation.Socket3Value,
    tier1: sublimation['I (Rare)'],
    tier2: sublimation['II (Mythical)'],
    tier3: sublimation['III (Legendary)'],
    maxLevel: sublimation.MaxLevel,
    obtainedFrom: sublimation.ObtainedFrom,
    sincePatch: sublimation.SincePatch,
    notes: sublimation.Notes
}));

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

  const filteredRows = rows.filter(sublimation => 
    sublimation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sublimation.socket.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sublimation.tier1.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sublimation.tier2.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sublimation.tier3.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sublimation.maxLevel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sublimation.obtainedFrom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sublimation.sincePatch.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sublimation.notes.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
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
