// src/components/Charts.jsx
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const data = [
  { name: "Product A", sales: 4000, profit: 2400 },
  { name: "Product B", sales: 3000, profit: 1398 },
  { name: "Product C", sales: 2000, profit: 9800 },
  { name: "Product D", sales: 2780, profit: 3908 },
  { name: "Product E", sales: 1890, profit: 4800 },
];

export default function Charts() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Sales vs Profit</h2>
      <BarChart width={700} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="sales" fill="#8884d8" />
        <Bar dataKey="profit" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}
