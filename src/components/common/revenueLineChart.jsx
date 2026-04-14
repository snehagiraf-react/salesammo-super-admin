import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../../assets/styles/chart.css";

const defaultData = [
  { name: "Jan", total: 2000 },
  { name: "Feb", total: 3000 },
  { name: "Mar", total: 4000 },
  { name: "Apr", total: 5000 },
  { name: "May", total: 6000 },
  { name: "Jun", total: 7000 },
];

const defaultLines = [
  {
    dataKey: "total",
    name: "Total Users",
    stroke: "#5C308D",
    dotColor: "#5C308D",
  },
];

export default function RevenueLineChart({
  data = defaultData,
  title = "Revenue Growth",
  subtitle = "Overview of revenue growth and trends",
  lines = defaultLines,
}) {
  return (
    <div className="chart-card">
      <h3>{title}</h3>
      <p className="subtitle">{subtitle}</p>

      <div className="chart-container">
        <ResponsiveContainer width="100%" minWidth={300} height={280}>
          <LineChart data={data}>
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            {lines.map((line) => (
              <Line
                key={line.dataKey}
                type="monotone"
                dataKey={line.dataKey}
                name={line.name}
                stroke={line.stroke}
                strokeWidth={3}
                dot={{ r: 5, fill: line.dotColor }}
                activeDot={{ r: 7 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-legend">
        {lines.map((line) => (
          <div key={line.dataKey} className="chart-legend-item">
            <span
              className="chart-legend-dot"
              style={{ background: line.stroke }}
            />
            <span>{line.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
