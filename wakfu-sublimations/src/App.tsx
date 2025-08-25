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
            <TableComponent />
          </Column>
        </Grid>
      </Content>
    </>
  )
}

export default App
