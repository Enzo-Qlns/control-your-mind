import { createRoot } from 'react-dom/client'

import App from './app.tsx'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <App />
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA