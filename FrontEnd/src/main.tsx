
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
  <MantineProvider>
<App />
  </MantineProvider>
  </BrowserRouter>,
)
