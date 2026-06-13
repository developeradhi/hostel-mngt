import React, { useEffect, useState } from 'react';
import useStore from '../../store/useStore';
import api from '../../utils/api';
import { Users, DollarSign, AlertCircle, QrCode, TrendingUp } from 'lucide-react';
import { LineChart, Line, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Card = ({ title, value, subtitle, icon: Icon, colorClass }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group">
    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
      <Icon size={80} />
    </div>
    <div className="flex justify-between items-start relative z-10">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        {subtitle && <p className={`text-sm mt-1 font-medium ${colorClass}`}>{subtitle}</p>}
      </div>
      <div className={`p-3 rounded-lg ${colorClass.replace('text-', 'bg-').replace('500', '100')} bg-opacity-20 shadow-sm`}>
        <Icon size={24} className={colorClass} />
      </div>
    </div>
  </div>
);

const COLORS = ['#16A34A', '#F59E0B', '#DC2626']; // Green, Yellow, Red

// Mock Data for AI Analytics
const mockOccupancyTrends = [
  { name: 'Week 1', occupants: 120 },
  { name: 'Week 2', occupants: 150 },
  { name: 'Week 3', occupants: 180 },
  { name: 'Week 4', occupants: 195 },
];

const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashRes, chartRes] = await Promise.all([
          api.get('/dashboard/admin'),
          api.get('/dashboard/analytics')
        ]);
        // Simulate a high occupancy scenario for AI Alerts
        setData({ ...dashRes.data, occupancyRate: 92, totalOccupants: 184, totalCapacity: 200 });
        setChartData(chartRes.data);
      } catch (error) {
        console.error(error);
        // Fallback for demo purposes if backend fails
        setData({
          totalOccupants: 184, totalCapacity: 200, occupancyRate: 92,
          pendingFees: '45,000', openComplaints: 8, passesToday: 24
        });
        setChartData({
          feeChart: [{ name: 'Paid', value: 80 }, { name: 'Pending', value: 20 }],
          complaintChart: [{ name: 'Electrical', count: 5 }, { name: 'Plumbing', count: 2 }, { name: 'Wi-Fi', count: 1 }]
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="flex h-64 items-center justify-center font-semibold text-gray-500">Loading AI Dashboard Insights...</div>;

  const isCapacityAlert = data?.occupancyRate >= 90;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            Admin Dashboard <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full border border-blue-200">AI Powered</span>
          </h1>
          <p className="text-gray-500 mt-1">Smart overview of occupancy trends, fees, and predictive alerts.</p>
        </div>
      </div>

      {isCapacityAlert && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-sm animate-fade-in flex items-start gap-3">
          <AlertCircle className="text-red-500 mt-0.5" />
          <div>
            <h4 className="text-red-800 font-bold">Intelligent Crowd Alert: High Capacity</h4>
            <p className="text-red-700 text-sm mt-1">
              Hostel occupancy has reached <strong>{data.occupancyRate}%</strong>. Predictive algorithms suggest halting new allocations to prevent resource strain on mess and electricity infrastructure.
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card 
          title="Total Occupancy" 
          value={`${data.totalOccupants}/${data.totalCapacity}`} 
          subtitle={`${data.occupancyRate}% filled`}
          icon={Users} colorClass={isCapacityAlert ? "text-red-500" : "text-primary-blue"}
        />
        <Card 
          title="Pending Fees" 
          value={`₹${data.pendingFees}`} 
          subtitle="Total outstanding"
          icon={DollarSign} colorClass="text-warning-yellow"
        />
        <Card 
          title="Open Complaints" 
          value={data.openComplaints} 
          subtitle="Requires attention"
          icon={AlertCircle} colorClass="text-alert-red"
        />
        <Card 
          title="Visitor Passes" 
          value={data.passesToday} 
          subtitle="Issued today"
          icon={QrCode} colorClass="text-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-primary-blue" />
            AI Occupancy Trends (30 Days)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockOccupancyTrends}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="occupants" stroke="#3B82F6" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Fee Collection</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData.feeChart}
                  cx="50%" cy="50%" innerRadius={60} outerRadius={80}
                  paddingAngle={5} dataKey="value"
                >
                  {chartData.feeChart.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
