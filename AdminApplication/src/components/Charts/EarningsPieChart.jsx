import { memo } from "react"; // Importer memo for performance optimering, ellers re-renders chart hver anden chart re-renders
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"; // Komponenter fra recharts 


const COLORS = ["#8884d8", "#82ca9d", "#ffc658"]; // Slot, Crash, Coinflip farver

const CustomTooltip = ({ active, payload }) => { // Custom tooltip for pie chart så den passer til temaet
  if (active && payload && payload.length) {
    const { name, value } = payload[0]; // Henter navn og værdi fra payload
    return (
      <div
        style={{ // Styling for tooltip
          background: "#1e1e2f",
          color: "#f1f5f9",  
          padding: "6px 10px", 
          borderRadius: "6px", // Runde hjørner
        }}
      >
        <p>{`${name}: ${value.toFixed(2)} USD`}</p> {/* Viser navn og værdi med 2 decimaler */}
      </div>
    );
  }
  return null;
}
const EarningsPieChart = ({ data }) => {
  return (
    <PieChart
      // Justere størrelsen på diagrammet
      width={480}
      height={320}
      margin={{ top: 10, right: 50, bottom: 10, left: 50 }}
    >
      <text
        x="50%"
        y="24" // distance from top
        textAnchor="middle"
        fill="#f1f5f9"
        fontSize={18}
        fontWeight={700}
      >
        Total Earnings pr. Game
      </text>

      <Pie
        data={data} // Diagrammet gad ikke vise uden denne linje
        cx="50%" // Centrere diagrammet horisontalt
        cy="50%" // Centrere diagrammet vertikalt
        outerRadius="80%" // fixet for bedre sizing
        dataKey="value" // Værdierne til pie slices
        nameKey="name" // Navnene til pie slices
      >
        {data.map((entry, index) => ( // Tilføjer farver til hver slice
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> // går igennem farverne hvis der er flere slices end farver
        ))}
      </Pie>
      
      <Tooltip content={<CustomTooltip />} />
      <Legend verticalAlign="bottom" align="center" />
    </PieChart>
  );
  
};

export default memo(EarningsPieChart); // Exporter her med memo så der ikke re-renders hver gang chart ændres

