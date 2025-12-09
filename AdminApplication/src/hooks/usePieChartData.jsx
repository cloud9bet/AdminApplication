import React, { useEffect, useState } from "react";
import EarningsPieChart from "../components/Charts/EarningsPieChart";

// Hook to generate pie chart data and element
export const usePieChartData = (transactions, slotData, crashData, coinflipData) => {
  const [pieChartElement, setPieChartElement] = useState(null); // state til at holde pie chart elementet

  useEffect(() => { // Opdater pie chart elementet når transactions ændres
    if (transactions.length === 0) return; // ingen transactions så gør ikke noget

    const chartData = [ // Forbereder data til pie chart
      { name: "Slot Machine", value: slotData.reduce((sum, d) => sum + d.earnings, 0) }, // summerer earnings for SlotMachine
      { name: "Crash", value: crashData.reduce((sum, d) => sum + d.earnings, 0) },
      { name: "Coinflip", value: coinflipData.reduce((sum, d) => sum + d.earnings, 0) },
    ];

    setPieChartElement(<EarningsPieChart data={chartData} />); // Sætter pie chart elementet med den forberedte data
  }, [transactions]); // Kører effekten når transactions ændres


  return pieChartElement; // returnerer pie chart
};