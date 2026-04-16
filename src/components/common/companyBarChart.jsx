import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "../../assets/styles/chart.css";

const BarChartComponent = ({
  data = [],
  dataKey = "value",
  xKey = "name",
  title = "Chart",
  subtitle = "",
  barColor = "#5C308D",
  layout = "vertical", // 👈 NEW PROP
}) => {
  const isHorizontal = layout === "horizontal";

  const chartHeight = isHorizontal
    ? Math.max(data.length * 60, 300)
    : 300;

  return (
    <div className="line-chart-card">
      <div>
        <h3 className="chart-title">{title}</h3>
        {subtitle && <p className="chart-subtitle">{subtitle}</p>}
      </div>

      <ResponsiveContainer width="100%" height={chartHeight}>
        <BarChart
          data={data}
          layout={isHorizontal ? "vertical" : "horizontal"}
          margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />

          {isHorizontal ? (
            <>
              <XAxis type="number" />
              <YAxis dataKey={xKey} type="category" width={120} />
            </>
          ) : (
            <>
              <XAxis dataKey={xKey} />
              <YAxis />
            </>
          )}

          <Tooltip />

          <Bar
            dataKey={dataKey}
            fill={barColor}
            radius={
              isHorizontal
                ? [0, 6, 6, 0] // 👈 rounded right side
                : [6, 6, 0, 0] // 👈 rounded top
            }
            barSize={isHorizontal ? 40 : 40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;