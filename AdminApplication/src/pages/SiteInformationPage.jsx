import Footer from "../components/Footer"
import Header from "../components/Header"
import '../styles/SiteInformationPage.css'
import EarningsChart from "../components/Charts/EarningsChart"
import { processTransactionsByGame, processTotalEarnings } from '../utils/transactionUtils';
import { calculateSiteSummary } from '../utils/transactionUtils';
import EarningsPieChart from "../components/Charts/EarningsPieChart";
import { usePieChartData } from "../hooks/usePieChartData";


import { useState, useEffect } from 'react';
import { mockTransactions } from '../mock/mockTransactions'; // TODO: Henter dummy data og skal SLETTES når API er klar !
import { mockUsers } from "../mock/mockUsers"; // TODO: Henter dummy data og skal SLETTES når API er klar !  

function SiteInformationPage() {
  const [transactions, setTransactions] = useState([]); // til at behandle transaction data når API er klar
  const [users, setUsers] = useState([]); // Til at behandle user data når API er klar

  useEffect(() => {
    // TODO: SKIFT MED API CALL NÅR KLAR!!!!
    setTransactions(mockTransactions);
    setUsers(mockUsers);
  }, []);


  // Kalder funktionerne for at få data til hver chart
  const slotData = processTransactionsByGame(transactions, 'SlotMachine');
  const crashData = processTransactionsByGame(transactions, 'Crash');
  const coinflipData = processTransactionsByGame(transactions, 'Coinflip');
  const siteData = processTotalEarnings(transactions);
  const summary = calculateSiteSummary(transactions, users);
  const [activeChart, setActiveChart] = useState("total"); // State til at holde styr på hvilken chart der er aktiv

  const { totalUsers, totalTransactionsLast7Days, totalEarningsLast7Days } = calculateSiteSummary(transactions, users); // Udtrækker summeringsdata

  const pieChartElement = usePieChartData(transactions, slotData, crashData, coinflipData); // Bruger hook til at få pie chart elementet

  return (
    <div className="siteinformation-main-container">
      <div className="SiteInformation-container">
        <Header />

        <div className="dashboard-container">
          <h1 className="dashboard-title">Dashboard</h1>

          {/* Øverste sektion med summeringer */}
          <div className="dashboard-summary-wrapper">
            <div className="dashboard-summary">
              <div className="summary-box">
                <h3>Total Users</h3>
                <p>{summary.totalUsers}</p>
              </div>
              <div className="summary-box">
                <h3>Transactions (7 days)</h3>
                <p>{summary.totalTransactionsLast7Days}</p>
              </div>
              <div className="summary-box">
                <h3>Earnings (7 days)</h3>
                <p>{summary.totalEarningsLast7Days.toFixed(2)} USD</p> {/* Fikser til 2 decimaler og konvertere til string */}
              </div>
            </div>
          </div>


          {/* Nederste sektion med grafer */}
          <div className="dashboard-main-section">
            <div className="earnings-chart-section">
              <div className="chart-buttons">
                <button
                  className={activeChart === "total" ? "active" : ""}
                  onClick={() => setActiveChart("total")}
                >
                  Total Site
                </button>
                <button
                  className={activeChart === "slot" ? "active" : ""}
                  onClick={() => setActiveChart("slot")}
                >
                  Slot Machine
                </button>
                <button
                  className={activeChart === "crash" ? "active" : ""}
                  onClick={() => setActiveChart("crash")}
                >
                  Crash
                </button>
                <button
                  className={activeChart === "coinflip" ? "active" : ""}
                  onClick={() => setActiveChart("coinflip")}
                >
                  Coinflip
                </button>
              </div>

              {/* Chart display område */}
              <div className="chart-display">
                {activeChart === "total" && (
                  <EarningsChart data={siteData} title="Total Site Earnings" color="#ff7300" />
                )}
                {activeChart === "slot" && (
                  <EarningsChart data={slotData} title="Slot Machine Earnings" color="#8884d8" />
                )}
                {activeChart === "crash" && (
                  <EarningsChart data={crashData} title="Crash Earnings" color="#82ca9d" />
                )}
                {activeChart === "coinflip" && (
                  <EarningsChart data={coinflipData} title="Coinflip Earnings" color="#ffc658" />
                )}
              </div>
            </div>

            {/* Pie Chart sektion */}
            <div className="earnings-pie-section">
              {pieChartElement}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default SiteInformationPage


