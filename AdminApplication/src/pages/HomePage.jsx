import Footer from "../components/Footer";
import Header from "../components/Header";
import UserInformationButton from "../components/UserInformationButton";
import SiteInformationButton from "../components/SiteInformationButton";

import "../styles/HomePage.css";

function HomePage() {
  return (
    <div className="homepage-container">
      <Header />

      <div className="homepage-buttons">
        <UserInformationButton />
        <SiteInformationButton />
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;
