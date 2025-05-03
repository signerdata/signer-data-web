import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          justifyContent: 'start',
          boxShadow: 'none',
          position: 'relative',
          borderRadius: 'var(--space-3)',
          padding: 'var(--space-4)',
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: 0,
          '&.Mui-expanded': {
            minHeight: 0,
          },
          '& .MuiAccordionSummary-content': {
            margin: 0,
            '&.Mui-expanded': {
              margin: 0,
            },
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: () => ({
          borderWidth: '2px',
          borderRadius: 'var(--space-1)',
          fontWeight: 'bold',
          textTransform: 'none',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
          '&:active': {
            boxShadow: 'none',
          },
          padding: '8px 16px',
        }),
        sizeLarge: {
          padding: '12px 24px',
        },
        outlined: {
          padding: '6px 16px',
          '&.MuiButton-sizeLarge': {
            padding: '10px 24px',
          },
        },
        contained: {
          padding: '8px 16px',
          '&.MuiButton-sizeLarge': {
            padding: '12px 24px',
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: () => ({
          fontSize: '14px',
          borderRadius: 'var(--space-1) !important',
        }),
      },
    },
  },
  typography: {
    fontFamily: 'inherit',
  },
  palette: {
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF',
    },
    success: {
      main: '#388E3C',
      light: '#66BB6A',
      dark: '#1B5E20',
      contrastText: '#FFFFFF',
    },
    info: {
      main: '#1976D2',
      light: '#64B5F6',
      dark: '#0D47A1',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#D32F2F',
      light: '#E57373',
      dark: '#B71C1C',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: '#FFA000',
      light: '#FFB74D',
      dark: '#F57C00',
      contrastText: '#000000',
    },
    divider: '#BDBDBD',
    action: {
      active: '#D32F2F',
      hover: '#E57373',
      selected: '#FF6659',
      disabled: '#BDBDBD',
      disabledBackground: '#EEEEEE',
    },
  },
})

export default theme
