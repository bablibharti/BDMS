import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Droplet,
  ClipboardList,
  AlertCircle,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import API from "../../services/adminApi";

const MetricCard = ({ title, value, icon: Icon, color, badge }) => {
  return (
    <Card className="relative overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
      {/* Watermark Icon */}
      <div className="absolute right-4 top-4 opacity-10">
        <Icon size={80} />
      </div>

      <CardContent className="p-6">
        <p className="text-sm text-muted-foreground">
          {title}
        </p>

        <h2 className="text-4xl font-bold mt-2">
          {value}
        </h2>

        {badge && (
          <Badge className="mt-3" variant="secondary">
            {badge}
          </Badge>
        )}

        <div
          className={`mt-4 inline-flex items-center justify-center rounded-xl p-3 ${color} bg-opacity-15`}
        >
          <Icon className={`${color.replace("bg", "text")} h-6 w-6`} />
        </div>
      </CardContent>
    </Card>
  );
};


const AdminDashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get("/stats").then((res) => setStats(res.data));
  }, []);

  if (!stats) return null;

  const chartData = [
    { name: "Users", value: stats.totalUsers },
    { name: "Donors", value: stats.totalDonors },
    { name: "Requests", value: stats.totalRequests },
    { name: "Pending", value: stats.pendingRequests },
  ];

  const StatCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border flex justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-3xl font-bold">{value}</h3>
      </div>
      <div className={`${color} p-3 rounded-full bg-opacity-15`}>
        <Icon className={`${color.replace("bg", "text")}`} />
      </div>
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* STATS */}
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
  <MetricCard
    title="Total Users"
    value={stats.totalUsers}
    icon={Users}
    color="bg-blue-600"
    badge="+ Active"
  />

  <MetricCard
    title="Total Donors"
    value={stats.totalDonors}
    icon={Droplet}
    color="bg-red-600"
    badge="Verified"
  />

  <MetricCard
    title="Blood Requests"
    value={stats.totalRequests}
    icon={ClipboardList}
    color="bg-purple-600"
  />

  <MetricCard
    title="Pending Requests"
    value={stats.pendingRequests}
    icon={AlertCircle}
    color="bg-yellow-500"
    badge="Needs action"
  />
</div>


      {/* CHART */}
<Card className="hover:shadow-xl transition">
  <CardContent className="p-6">
    <h2 className="text-xl font-semibold mb-4">
      System Overview
    </h2>

    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="value"
          fill="#dc2626"
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </CardContent>
</Card>

    </div>
  );
};

export default AdminDashboard;
