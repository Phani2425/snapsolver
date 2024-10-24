
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';
import { Auth0Provider } from '@auth0/auth0-react';

createRoot(document.getElementById('root')!).render(
  
    <BrowserRouter>
  <MantineProvider>
  <Auth0Provider
    domain="dev-qf58iw733tx8oi6z.us.auth0.com"
    clientId="q0vjUnQeHB9adYyatw4D3RduMEWX4kix"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <App />
  </Auth0Provider>
  </MantineProvider>
  </BrowserRouter>

)
