import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  spacing: 8,
  palette: {
    primary: {
      main: '#4c49f1'
    },
    secondary: {
      main: '#ffffff'
    },
  },
  overrides: {
    MuiButton: {
      root: {
        marginTop: 4,
        marginBottom: 4
      }
    },
    MuiTextField: {
      root: {
        marginTop: 4,
        marginBottom: 4
      }
    },
    MuiLink: {
      root: {
        marginTop: 4,
        marginBottom: 4
      }
    },
    MuiAppBar: {
      root: {
        marginBottom: 60
      }
    },
    MuiFab: {
      root: {
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10
      }
    }
  }
})
