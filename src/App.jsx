import React, { useState } from 'react'
import { Box, Tabs, Tab, AppBar } from '@mui/material'
import MuiIconsPage from './MuiIconsPage'
import FluentIconsPage from './FluentIconsPage'

function App() {
  const [currentTab, setCurrentTab] = useState(0)

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue)
  }

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" sx={{ mb: 4 }}>
        <Tabs
          value={currentTab}
          onChange={handleTabChange}
          centered
          textColor="inherit"
          indicatorColor="secondary"
          sx={{
            '& .MuiTab-root': {
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '1rem',
              fontWeight: 'medium',
              minHeight: 64,
              '&:hover': {
                color: 'rgba(255, 255, 255, 0.9)'
              }
            },
            '& .Mui-selected': {
              color: 'white !important',
              fontWeight: 'bold'
            },
            '& .MuiTabs-indicator': {
              backgroundColor: 'white',
              height: 3
            }
          }}
        >
          <Tab label="Fluent UI Icons" />
          <Tab label="MUI Icons" />
        </Tabs>
      </AppBar>
      
      {currentTab === 0 && <FluentIconsPage />}
      {currentTab === 1 && <MuiIconsPage />}
    </Box>
  )
}

export default App

