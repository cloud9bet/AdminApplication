import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'; // Importerer komponenter fra recharts

function EarningsChart({ data, title, color }) {
  return (
    <div className="individual-chart">
      <h2>{title}</h2>
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
          <Tooltip // Viser tooltip (så man kan se earnings når man holder musen over en bar)
            labelFormatter={(dateStr) => {
              const date = new Date(dateStr);
              return `${date.getDate()}/${date.getMonth() + 1}`; // formatered dato
            }}
          />
          <Legend /> {/* Viser legend for diagrammet */}
          <Bar dataKey="earnings" fill={color} name="Earnings (USD)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EarningsChart;
