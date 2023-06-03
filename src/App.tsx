import { ThemeProvider } from 'styled-components'
import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { Router } from './Router'
import { BrowserRouter } from 'react-router-dom'
import { CyclesProvider } from './contexts/Cycles'

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultTheme}>
        <CyclesProvider>
          <Router />
        </CyclesProvider>

        <GlobalStyle />
      </ThemeProvider>
    </BrowserRouter>
  )
}
