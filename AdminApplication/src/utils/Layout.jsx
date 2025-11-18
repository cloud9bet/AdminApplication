import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/Layout.css";

function Layout() {
    return (
        <div className="layout">
            <Header />

            <main className="layout-content">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default Layout;
