import { Content, Grid, Column } from '@carbon/react'
import { useState } from 'react'
import './App.css'
import HeaderComponent from './components/HeaderComponent'
import TableComponent from './components/TableComponent'

export type SublimationType = 'regular' | 'epic' | 'relic'

function App() {
  const [activeTab, setActiveTab] = useState<SublimationType>('regular')

  return (
    <>
      <HeaderComponent activeTab={activeTab} onTabChange={setActiveTab} />
      <Content>
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <TableComponent activeTab={activeTab} />
          </Column>
        </Grid>
      </Content>
    </>
  )
}

export default App
