"use client";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

type AppLineChartProps = {
  data: any[];
  dataKey: string;
  height?: number;
};

function AppLineChart({ data, dataKey, height = 400 }: AppLineChartProps) {
  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 0, right: 20, left: 10, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name.official" angle={-35} textAnchor="end" />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
            }}
          />
          <Legend layout="horizontal" verticalAlign="top" align="center" />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="var(--chart-2)"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AppLineChart;
