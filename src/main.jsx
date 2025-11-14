import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Test from './Test'
import Properties from './pages/Properties'
import PropertyDetail from './pages/PropertyDetail'
import Editor from './pages/Editor'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/properti" element={<Properties />} />
        <Route path="/properti/:id" element={<PropertyDetail />} />
        <Route path="/edit" element={<Editor />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
