import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useState, useEffect } from "react";
import "../../assets/styles/chart.css";
import { Bold } from "lucide-react";

const CompanyBarChart = ({
  data = [],
  bars = [], // [{ dataKey: "sales", color: "#8884d8", name: "Sales" }]
  xKey,
  title, // Chart title
  subtitle, // Chart subtitle
  height = 300,
  showGrid = true,
  showLegend = false,
  layout = "vertical", // or "vertical"
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // Handle empty data or bars
  if (!data || data.length === 0 || !bars || bars.length === 0) {
    return (
      <div className="chart-card">
        {title && (
          <div className="chart-header">
            <h3 className="chart-title">{title}</h3>
            {subtitle && <p className="chart-subtitle">{subtitle}</p>}
          </div>
        )}
        <p
          style={{
            textAlign: "center",
            color: "#6b7280",
            padding: "40px 20px",
          }}
        >
          No data available
        </p>
      </div>
    );
  }

  return (
    <div className="chart-card">
      {title && (
        <div className="chart-header">
          <h3 className="chart-title">{title}</h3>
          {subtitle && <p className="chart-subtitle">{subtitle}</p>}
        </div>
      )}
      <div className={isMobile ? "chart-wrapper" : ""}>
        <div style={isMobile ? { minWidth: "600px" } : { width: "100%" }}>
          <ResponsiveContainer width="100%" height={height}>
            <BarChart
              data={data}
              layout={layout}
              margin={
                layout === "vertical"
                  ? { top: 5, right: 30, left: 0, bottom: 5 }
                  : { top: 5, right: 30, left: 0, bottom: 5 }
              }
            >
              {showGrid && (
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e5e7ebab"
                />
              )}

              {layout === "vertical" ? (
                <>
                  <XAxis type="number" stroke="#6b7280" />
                  <YAxis
                    type="category"
                    dataKey={xKey}
                    stroke="#9196a0"
                    width={140}
                    fontSize={"14px"}
                    fontWeight={Bold}
                  />
                </>
              ) : (
                <>
                  <XAxis dataKey={xKey} type="category" stroke="#6b7280" />
                  <YAxis type="number" stroke="#6b7280" />
                </>
              )}

              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
                cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
              />
              {showLegend && <Legend />}

              {bars.map((bar, index) => (
                <Bar
                  key={index}
                  dataKey={bar.dataKey}
                  fill={bar.color}
                  name={bar.name}
                  radius={layout === "vertical" ? [0, 8, 8, 0] : [8, 8, 0, 0]}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CompanyBarChart;
