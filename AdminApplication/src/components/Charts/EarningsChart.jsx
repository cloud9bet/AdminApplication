import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const CustomTooltip = ({ active, payload, label }) => { // Custom tooltip til teksten når man hover over søjlerne
  if (active && payload && payload.length) { // Tjekker om tooltip er aktiv og om der er data at vise
    const date = new Date(label); // Konverterer label (dato string) til et Date objekt
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`; // Formaterer datoen som DD/MM
    const { value } = payload[0]; // Henter værdien (earnings) fra payload

    return (
      <div
        style={{ // Styling for tooltip/teksten
          background: "#1e1e2f", 
          color: "#f1f5f9",     
          padding: "6px 10px", 
          borderRadius: "6px", // Runde hjørner
        }}
      >
        <p>{`Earnings (USD): ${value.toFixed(2)}`}</p> {/* Viser earnings med 2 decimaler */}
        <p style={{ fontSize: "0.8em", opacity: 0.8 }}>{formattedDate}</p> {/* Viser den formaterede dato */}
      </div>
    );
  }
  return null;
};

function EarningsChart({ data, title, color }) {
  return (
    <div className="individual-chart">
      <h2 style={{ color: "#f1f5f9" }}>{title}</h2>

      <ResponsiveContainer width="100%" height={250}> {/* Gør diagrammet responsivt */}
        <BarChart //Recharts diagram komponent
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
          <Tooltip content={<CustomTooltip />} /> {/* Bruger custom tooltip jeg har lavet */}
          <Legend /> {/* Viser legend for diagrammet */}
          <Bar dataKey="earnings" fill={color} name="Earnings (USD)" /> {/* Søjlerne i diagrammet med farve */}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
  
}

export default EarningsChart;
