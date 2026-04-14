import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import "../../assets/styles/chart.css";

const defaultData = [
  { name: "Mon", value: 2000 },
  { name: "Tue", value: 3000 },
  { name: "Wed", value: 2100 },
  { name: "Thu", value: 3600 },
  { name: "Fri", value: 2500 },
  { name: "Sat", value: 3200 },
  { name: "Sun", value: 2600 },
];

export default function CompanyBarChart({
  data = defaultData,
  title = "Company Growth",
  subtitle = "Monthly company growth trends",
  fill = "#5B2C83",
  xDataKey = "name",
  barDataKey = "value",
}) {
  return (
    <div className="chart-card">
      <h3>{title}</h3>
      <p className="subtitle">{subtitle}</p>

      <div className="chart-container">
        <ResponsiveContainer width="100%" minWidth={300} height={280}>
          <BarChart data={data}>
            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey={xDataKey} />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey={barDataKey}
              fill={fill}
              radius={[8, 8, 0, 0]}
              barSize={40}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}