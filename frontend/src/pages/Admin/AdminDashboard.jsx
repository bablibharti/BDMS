import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Droplet,
  ClipboardList,
  AlertCircle,
  Activity,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import API from "../../services/adminApi";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await API.get("/stats");
        setStats(res.data || {});
      } catch (err) {
        console.error("Failed to load stats:", err);
        setError("Could not load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Activity className="h-12 w-12 animate-spin text-red-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  // Safe fallback values if stats is missing fields
  const safeStats = {
    totalUsers: stats?.totalUsers ?? 0,
    totalDonors: stats?.totalDonors ?? 0,
    totalRequests: stats?.totalRequests ?? 0,
    pendingRequests: stats?.pendingRequests ?? 0,
  };

  const chartData = [
    { name: "Total Users", value: safeStats.totalUsers, fill: "#3b82f6" },
    { name: "Active Donors", value: safeStats.totalDonors, fill: "#ef4444" },
    { name: "Blood Requests", value: safeStats.totalRequests, fill: "#8b5cf6" },
    { name: "Pending", value: safeStats.pendingRequests, fill: "#f59e0b" },
  ];

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <Card className="relative overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 rounded-xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Total Users</p>
                <h2 className="text-4xl font-bold mt-1">{safeStats.totalUsers}</h2>
              </div>
              <div className="bg-blue-100 p-4 rounded-full">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 rounded-xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Total Donors</p>
                <h2 className="text-4xl font-bold mt-1">{safeStats.totalDonors}</h2>
              </div>
              <div className="bg-red-100 p-4 rounded-full">
                <Droplet className="h-8 w-8 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 rounded-xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Blood Requests</p>
                <h2 className="text-4xl font-bold mt-1">{safeStats.totalRequests}</h2>
              </div>
              <div className="bg-purple-100 p-4 rounded-full">
                <ClipboardList className="h-8 w-8 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden hover:shadow-lg transition-shadow border border-gray-200 rounded-xl">
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Pending Requests</p>
                <h2 className="text-4xl font-bold mt-1">{safeStats.pendingRequests}</h2>
              </div>
              <div className="bg-yellow-100 p-4 rounded-full">
                <AlertCircle className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card className="hover:shadow-lg transition-shadow border border-gray-200 rounded-xl overflow-hidden">
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex items-center gap-2">
            <Activity className="h-5 w-5 text-red-600" />
            System Overview
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 pt-2">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: '1px solid #e2e8f0', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)' 
                  }} 
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#dc2626" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;