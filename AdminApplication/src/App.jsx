import './styles/App.css'
import {Routes, Route} from "react-router-dom"
import LoginPage from './pages/LoginPage'
import TransactionPage from './pages/TransactionPage'
import HomePage from './pages/HomePage'

function App() {

  return (
    <main className="main-content"> 
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/home" element={<HomePage />}/>
        <Route path="/Transactions"element={<TransactionPage/>}/>
      </Routes>
    </main>
  )
}

export default App