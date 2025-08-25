import { useState } from 'react'
import { Button, Content, Grid, Column, TextInput, Select, SelectItem, DataTable, Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from '@carbon/react'
import './App.css'
import HeaderComponent from './components/HeaderComponent'
import TableComponent from './components/TableComponent'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <HeaderComponent />
      
      <Content>
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <h1>Wakfu Sublimations</h1>
            <p>Filter and search through sublimation data</p>

            <div style={{ marginBottom: '2rem' }}>
              <Select
                id="socket-filter"
                labelText="Socket Filter"
                defaultValue=""
              >
                <SelectItem value="" text="All Sockets" />
                <SelectItem value="red" text="Red Socket" />
                <SelectItem value="blue" text="Blue Socket" />
                <SelectItem value="green" text="Green Socket" />
                <SelectItem value="yellow" text="Yellow Socket" />
              </Select>
            </div>
            
            <div style={{ marginBottom: '2rem' }}>
              <Button onClick={() => setCount((count) => count + 1)}>
                Search
              </Button>
            </div>

            <TableComponent />
          </Column>
        </Grid>
      </Content>
    </>
  )
}

export default App
