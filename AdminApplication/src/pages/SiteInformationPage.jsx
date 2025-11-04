import Footer from "../components/Footer"
import Header from "../components/Header"
import '../styles/SiteInformationPage.css'
import EarningsChart from "../components/charts/EarningsChart"
import { processTransactionsByGame, processTotalEarnings } from '../utils/transactionUtils';
import EarningsPieChart from "../components/Charts/EarningsPieChart";


import { useState, useEffect } from 'react';
import { mockTransactions } from '../mock/mockTransactions'; // TODO: Henter dummy data og skal SLETTES når API er klar !

function SiteInformationPage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // TODO: SKIFT MED API CALL NÅR KLAR!!!!
    setTransactions(mockTransactions);
  }, []);


  // Kalder funktionerne for at få data til hver chart
  const slotData = processTransactionsByGame(transactions, 'SlotMachine');
  const crashData = processTransactionsByGame(transactions, 'Crash');
  const coinflipData = processTransactionsByGame(transactions, 'Coinflip');
  const siteData = processTotalEarnings(transactions);


  return ( // Kald af renderChart funktionen for hver chart med relevant data og farve
    <div className="siteinformation-main-container">
      <div className="SiteInformation-container">
        <Header />
        <div className="charts-container">
          <EarningsChart data={siteData} title="Total Site Earnings" color="#ff7300" />
          <EarningsChart data={slotData} title="Slot Machine Earnings" color="#8884d8" />
          <EarningsChart data={crashData} title="Crash Earnings" color="#82ca9d" />
          <EarningsChart data={coinflipData} title="Coinflip Earnings" color="#ffc658" />
        </div>
        {transactions.length > 0 && slotData.length > 0 && crashData.length > 0 && coinflipData.length > 0 && (
          <div className="piechart-container">
            <EarningsPieChart
              data={[
                { name: "Slot Machine", value: slotData.reduce((sum, d) => sum + d.earnings, 0) },
                { name: "Crash", value: crashData.reduce((sum, d) => sum + d.earnings, 0) },
                { name: "Coinflip", value: coinflipData.reduce((sum, d) => sum + d.earnings, 0) },
              ]}
            />
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}

export default SiteInformationPage
