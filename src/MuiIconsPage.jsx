import React from 'react'
import { Container, Typography, Grid, Paper } from '@mui/material'
// Import original MUI icons using the original alias to bypass the Fluent UI mapping
import * as Icons from '@mui/icons-material-original'
import { getIconsConfig } from './iconsConfig'

function MuiIconsPage() {
  const icons = getIconsConfig(Icons)

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography 
        variant="h3" 
        component="h1" 
        gutterBottom 
        align="center"
        sx={{ mb: 4, fontWeight: 'bold', color: '#1976d2' }}
      >
        MUI Icons Display
      </Typography>
      
      <Grid container spacing={3}>
        {icons.map(({ Icon, name, color }, index) => (
          <Grid item xs={6} sm={4} md={3} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 6
                },
                cursor: 'pointer'
              }}
            >
              <Icon 
                sx={{ 
                  fontSize: 48, 
                  color: color 
                }} 
              />
              <Typography 
                variant="body2" 
                sx={{ 
                  fontWeight: 'medium',
                  textAlign: 'center'
                }}
              >
                {name}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default MuiIconsPage

