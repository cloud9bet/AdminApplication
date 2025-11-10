import { memo } from "react"; // Importer memo for performance optimering, ellers re-renders chart hver anden chart re-renders
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts"; // Komponenter fra recharts 


const COLORS = ["#8884d8", "#82ca9d", "#ffc658"]; // Slot, Crash, Coinflip farver
const outerRadius = window.innerWidth < 1000 ? 70 : 100; // Justerer størrelsen på pie chart baseret på skærmstørrelse

const EarningsPieChart = ({ data }) => {
  return (
    <PieChart
      // Justere størrelsen på diagrammet
      width={480} 
      height={320}      
      margin={{ top: 10, right: 50, bottom: 10, left: 50 }}
    >
      <Pie
        data={data} // Diagrammet gad ikke vise uden denne linje
        cx="50%" // Centrere diagrammet horisontalt
        cy="50%" // Centrere diagrammet vertikalt
        outerRadius={100}
        dataKey="value" // Værdierne til pie slices
        nameKey="name" // Navnene til pie slices
        label={({ name, value }) => `${name}: ${value}`} // Viser navn og værdi på hver slice
      >
        {data.map((entry, index) => ( // Tilføjer farver til hver slice
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} /> // går igennem farverne hvis der er flere slices end farver
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

export default memo(EarningsPieChart); // Exporter her med memo så der ikke re-renders hver gang chart ændres

