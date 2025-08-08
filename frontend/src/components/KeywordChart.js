import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const KeywordChart = ({ data }) => {
  // Convert array of [word, count] → array of objects for chart
  const formatted = data.map(([keyword, count]) => ({
    keyword,
    count
  }));

  return (
    <div style={{
      marginTop: "2rem",
      backgroundColor: "#fefefe",
      padding: "1.5rem",
      borderRadius: "12px",
      boxShadow: "0 0 10px rgba(0,0,0,0.05)"
    }}>
      <h2 style={{ marginBottom: "1rem" }}>📊 Top Keywords</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={formatted} layout="vertical" margin={{ left: 50 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis type="category" dataKey="keyword" width={100} />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default KeywordChart;
