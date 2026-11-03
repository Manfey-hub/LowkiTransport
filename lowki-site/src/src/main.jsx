import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LowkiSite from './LowkiSite.jsx'

const root = createRoot(document.getElementById('root'))
root.render(<React.StrictMode><LowkiSite /></React.StrictMode>)
