import React, { useState, useEffect, useMemo } from "react";
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
import { useViewGraphQuery } from "../../hooks/dashboard/graph.view.all";
import { mapGraphToChart } from "../../utils/mapDashboardGraph";

const LineChartComponent = ({
  data: propData,
  lines: propLines = [],
  xKey: propXKey = "name",
  title: propTitle = "Chart",
  subtitle: propSubtitle = "",
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const fetchFromApi = propData == null;
  const { data: fetchedData, isLoading, isError } = useViewGraphQuery({
    enabled: fetchFromApi,
  });

  const chartConfig = useMemo(() => {
    if (fetchFromApi) {
      return (
        mapGraphToChart(fetchedData) ?? {
          data: [],
          lines: [],
          xKey: propXKey,
          title: propTitle,
          subtitle: propSubtitle,
        }
      );
    }

    return {
      data: propData ?? [],
      lines: propLines,
      xKey: propXKey,
      title: propTitle,
      subtitle: propSubtitle,
    };
  }, [
    fetchFromApi,
    fetchedData,
    propData,
    propLines,
    propXKey,
    propTitle,
    propSubtitle,
  ]);

  const { data, lines, xKey, title, subtitle } = chartConfig;
  const hasRightAxis = lines.some((line) => line.yAxisId === "right");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (fetchFromApi && isLoading) {
    return <div className="line-chart-card chart-loading">Loading chart...</div>;
  }
  if (fetchFromApi && isError) {
    return <div className="line-chart-card chart-error">Error loading chart</div>;
  }
  if (!data?.length || !lines?.length) {
    return <div className="line-chart-card chart-empty">No data available</div>;
  }

  const chartWidth = data.length * 80;

  return (
    <div className="line-chart-card">
      <div>
        <h3 className="chart-title">{title}</h3>
        {subtitle && <p className="chart-subtitle">{subtitle}</p>}
      </div>

      {isMobile ? (
        <div className="chart-scroll">
          <div className="chart-container" style={{ width: chartWidth }}>
            <LineChart width={chartWidth} height={300} data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                vertical={false}
              />
              <XAxis dataKey={xKey} stroke="#e5e7ebab" />
              <YAxis yAxisId="left" stroke="#e5e7ebab" />
              {hasRightAxis && (
                <YAxis yAxisId="right" orientation="right" stroke="#e5e7ebab" />
              )}
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />

              {lines.map((line, index) => (
                <Line
                  key={index}
                  yAxisId={line.yAxisId || "left"}
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
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              vertical={false}
            />
            <XAxis dataKey={xKey} stroke="#6b7280" />
            <YAxis yAxisId="left" stroke="#6b7280" />
            {hasRightAxis && (
              <YAxis yAxisId="right" orientation="right" stroke="#6b7280" />
            )}
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <Legend />

            {lines.map((line, index) => (
              <Line
                key={index}
                yAxisId={line.yAxisId || "left"}
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
