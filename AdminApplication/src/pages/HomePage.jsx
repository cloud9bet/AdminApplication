import Footer from "../components/Footer"
import Header from "../components/Header"
import UserPageLogo from "../components/UserPageLogo"
import TransactionPageLogo from "../components/TransactionPageLogo"
import SiteInformationPageLogo from "../components/SiteInformationPageLogo"
import '../styles/HomePage.css'


function HomePage() {
  return (
  <div className="Homepage-container">
    <div>
      <Header/>
    </div>
    <div className="Homepage-Links">
        <UserPageLogo/>
        <TransactionPageLogo/>
        <SiteInformationPageLogo/>
    </div>
    <div>
        <Footer/>
    </div>
  </div>
  )
}

export default HomePage
