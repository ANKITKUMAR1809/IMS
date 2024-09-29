import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AddStock from './pages/AddStock'
import Inventory from './pages/Inventory'
import Sell from './pages/Sell'
import SellHistory from './pages/SellHistory'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<Contact/>} />
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="dashboard/addStock" element={<AddStock/>} />
        <Route path="dashboard/inventory" element={<Inventory/>} />
        <Route path="dashboard/sell" element={<Sell/>} />
        <Route path="dashboard/sell-history" element={<SellHistory/>} />
        {/* <Route path="*" element={<NoPage />} /> */}
      </Route>
    </Routes>
  </BrowserRouter>
    </>
  )
}

export default App
