import { Content, Grid, Column } from '@carbon/react'
import './App.css'
import HeaderComponent from './components/HeaderComponent'
import TableComponent from './components/TableComponent'


function App() {

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
