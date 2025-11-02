import Footer from "../components/Footer"
import Header from "../components/Header"
import '../styles/SiteInformationPage.css'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // Importerer komponenter fra recharts
import { useState, useEffect } from 'react'; 
import { mockTransactions } from '../mock/mockTransactions'; // TODO: Henter dummy data og skal SLETTES når API er klar !

function SiteInformationPage() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // TODO: SKIFT MED API CALL NÅR KLAR!!!!
    setTransactions(mockTransactions);
  }, []);

  // Funktion der grupper transactions efter spilnavn og sorter dem efter dato
  const processTransactionsByGame = (gameName) => {
    return transactions
      .filter(t => t.gameName === gameName) // Går igennem tranactions og filtrere efter spilnavn
      .map(t => ({ // Tager hver filtreret transaction og laver et nyt objekt med dato og indtjening
        date: t.date,
        earnings: t.amount
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // Tilføjet så der korrekt sortering til grafer
  };


  // Funktion til at beregne total indtjening i en chart
  const processTotalEarnings = () => {
    const earningsByDate = {};
    transactions.forEach(t => { // Samler indtjening per dato 
      if (earningsByDate[t.date]) {
        earningsByDate[t.date] += t.amount;
      } else {
        earningsByDate[t.date] = t.amount;
      }
    });

    return Object.entries(earningsByDate) // Tager hver filtreret transaction og laver et nyt objekt med dato og indtjening
      .map(([date, total]) => ({
        date,
        earnings: total
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // Tilføjet så der korrekt sortering til grafer
  };

  // Kalder funktionerne for at få data til hver chart
  const slotData = processTransactionsByGame('SlotMachine');
  const crashData = processTransactionsByGame('Crash');
  const coinflipData = processTransactionsByGame('Coinflip');
  const siteData = processTotalEarnings();

  // Funktion til at rendere et diagram
  const renderChart = (data, title, color) => (
    <div className="individual-chart">
      <h2>{title}</h2>
      <BarChart //Recharts diagram komponent
        width={300}
        height={250}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 25,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" /> {/* Gitter i diagrammet */}
        <XAxis // Sætter X-aksen med datoer
          dataKey="date"
          tickFormatter={(dateStr) => {
            const date = new Date(dateStr);
            return `${date.getDate()}/${date.getMonth() + 1}`; // Formateres som DD/MM
          }}
          interval={0} // Viser alle ticks
          angle={-45} // Roterer labels da der ikke er meget plads
          textAnchor="end" // Justerer tekstplacering
          height={60} // Ændre højden for labels
        />
        <YAxis /> {/* Sætter Y-aksen */}
        <Tooltip // Viser tooltip (så man kan se earnings når man holder musen over en bar)
          labelFormatter={(dateStr) => {
            const date = new Date(dateStr);
            return `${date.getDate()}/${date.getMonth() + 1}`; // formatered dato
          }}
        />
        <Legend /> {/* Viser legend for diagrammet */}
        <Bar dataKey="earnings" fill={color} name="Earnings (USD)" /> 
      </BarChart>
    </div>
  );

  return ( // Kald af renderChart funktionen for hver chart med relevant data og farve
    <div className="main-container">
      <div className="SiteInformation-container">
        <Header />
        <div className="charts-container">
          {renderChart(siteData, "Total Site Earnings", "#ff7300")}
          {renderChart(slotData, "Slot Machine Earnings", "#8884d8")}
          {renderChart(crashData, "Crash Earnings", "#82ca9d")}
          {renderChart(coinflipData, "Coinflip Earnings", "#ffc658")}
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default SiteInformationPage
