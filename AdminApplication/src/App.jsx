import './styles/App.css'
import {Routes, Route} from "react-router-dom"
import LoginPage from './pages/LoginPage'
import TransactionPage from './pages/TransactionPage'
import HomePage from './pages/HomePage'
import SiteInformationPage from './pages/SiteInformationPage'
import UserPage from './pages/UserPage'

function App() {

  return (
    <main className="main-content"> 
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/home" element={<HomePage />}/>
        <Route path="/Transactions"element={<TransactionPage/>}/>
        <Route path="/SiteInformation"element={<SiteInformationPage/>}/>
        <Route path="/User"element={<UserPage/>}/>
      </Routes>
    </main>
  )
}

export default App