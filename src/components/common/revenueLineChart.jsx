import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../../assets/styles/chart.css";

const LineChartComponent = ({
  data = [],
  lines = [],
  xKey = "name",
  title = "Chart",
  subtitle = "",
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const chartWidth = data.length * 80;

  return (
    <div className="line-chart-card">
      <div>
        <h3 className="chart-title">{title}</h3>
        {subtitle && <p className="chart-subtitle">{subtitle}</p>}
      </div>

      {isMobile ? (
        // Mobile: scrollable chart
        <div className="chart-scroll">
          <div className="chart-container" style={{ width: chartWidth }}>
            <LineChart width={chartWidth} height={300} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xKey} />
              <YAxis />
              <Tooltip />
              <Legend />

              {lines.map((line, index) => (
                <Line
                  key={index}
                  type="monotone"
                  dataKey={line.dataKey}
                  name={line.name}
                  stroke={line.stroke || "#5C308D"}
                  strokeWidth={2}
                  dot={{ r: 4, fill: line.dotColor || line.stroke }}
                  activeDot={{ r: 6 }}
                />
              ))}
            </LineChart>
          </div>
        </div>
      ) : (
        // Desktop: responsive, no scroll
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Legend />

            {lines.map((line, index) => (
              <Line
                key={index}
                type="monotone"
                dataKey={line.dataKey}
                name={line.name}
                stroke={line.stroke || "#5C308D"}
                strokeWidth={2}
                dot={{ r: 4, fill: line.dotColor || line.stroke }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default LineChartComponent;