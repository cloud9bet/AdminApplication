import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";


function Layout() {

    return (
        <>
            <div className="Page-container">
                <div>
                    <Header />
                </div>
                <div>
                    <Outlet />
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default Layout
