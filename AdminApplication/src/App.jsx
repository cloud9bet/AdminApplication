import './styles/App.css'
import {Routes, Route} from "react-router-dom"
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import SiteInformationPage from './pages/SiteInformationPage'
import UserPage from './pages/UserPage'
import Layout from './utils/Layout'
import ProtectedRoutes from './utils/Protected'

function App() {

  return (
    <main className="main-content"> 
      <Routes >
        <Route element={<ProtectedRoutes/>}>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/SiteInformation"element={<SiteInformationPage/>}/>
            <Route path="/User"element={<UserPage/>}/>
          </Route>
        </Route>
    
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </main>
  )
}

export default App