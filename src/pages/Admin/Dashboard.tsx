import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  Activity, 
  Shield,
  TrendingUp,
  UserCheck,
  FileText,
  AlertCircle,
  Settings,
  Database
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '@/stores/auth';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const AdminDashboard = () => {
  const { user } = useAuth();

  // Mock data for admin analytics
  const systemStats = [
    { metric: 'Total Appointments', value: 1247, change: '+12%', period: 'this month' },
    { metric: 'Active Patients', value: 384, change: '+8%', period: 'this month' },
    { metric: 'Active Practitioners', value: 23, change: '+2%', period: 'this month' },
    { metric: 'Avg Sentiment Score', value: '87%', change: '+5%', period: 'this month' },
  ];

  const weeklyAppointments = [
    { week: 'W1', appointments: 287, completed: 265 },
    { week: 'W2', appointments: 312, completed: 290 },
    { week: 'W3', appointments: 345, completed: 328 },
    { week: 'W4', appointments: 298, completed: 275 },
  ];

  const userDistribution = [
    { name: 'Patients', value: 384, color: 'hsl(var(--primary))' },
    { name: 'Practitioners', value: 23, color: 'hsl(var(--success))' },
    { name: 'Admins', value: 5, color: 'hsl(var(--warning))' },
  ];

  const recentAuditLogs = [
    {
      id: 1,
      user: 'Dr. Rajesh Gupta',
      action: 'Uploaded medical record',
      patient: 'Priya Sharma',
      timestamp: '2024-01-15 14:30:00',
      ipfsHash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
    },
    {
      id: 2,
      user: 'Admin User',
      action: 'Granted record access',
      patient: 'Amit Kumar',
      timestamp: '2024-01-15 13:45:00',
      ipfsHash: 'QmXyZ123456789abcdef',
    },
    {
      id: 3,
      user: 'Dr. Priya Patel',
      action: 'Completed session',
      patient: 'Rahul Singh',
      timestamp: '2024-01-15 12:20:00',
      ipfsHash: null,
    },
  ];

  const chartConfig = {
    appointments: { label: "Scheduled", color: "hsl(var(--primary))" },
    completed: { label: "Completed", color: "hsl(var(--success))" },
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-foreground">
          System Overview 🏥
        </h1>
        <p className="text-muted-foreground">
          Monitor platform performance, user activity, and system health across all AyurSutra services.
        </p>
      </motion.div>

      {/* System Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat, index) => (
          <motion.div
            key={stat.metric}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.metric}</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span className="text-success">{stat.change}</span>
                  <span>{stat.period}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Manage Staff
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Shield className="w-4 h-4 mr-2" />
                Access Control
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Database className="w-4 h-4 mr-2" />
                System Backup
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Generate Reports
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <AlertCircle className="w-4 h-4 mr-2" />
                System Alerts
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* User Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>User Distribution</CardTitle>
              <CardDescription>
                Platform user breakdown by role
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={userDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {userDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="space-y-2 mt-4">
                {userDistribution.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* System Health */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                System Health
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>API Response Time</span>
                  <span className="text-success">145ms</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full w-[85%]"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Database Connections</span>
                  <span className="text-success">23/50</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full w-[46%]"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Storage Usage</span>
                  <span className="text-warning">67%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-warning h-2 rounded-full w-[67%]"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>WebSocket Connections</span>
                  <span className="text-success">156</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full w-[78%]"></div>
                </div>
              </div>

              <Badge variant="secondary" className="w-full justify-center">
                <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                All Systems Operational
              </Badge>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Weekly Appointments</CardTitle>
              <CardDescription>
                System-wide appointment metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyAppointments}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Bar dataKey="appointments" fill="var(--color-appointments)" radius={4} />
                    <Bar dataKey="completed" fill="var(--color-completed)" radius={4} />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Audit Logs</CardTitle>
              <CardDescription>
                Latest system activity and security events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentAuditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="font-medium">{log.user}</TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{log.action}</p>
                          <p className="text-xs text-muted-foreground">
                            Patient: {log.patient}
                          </p>
                          {log.ipfsHash && (
                            <p className="text-xs text-primary font-mono">
                              IPFS: {log.ipfsHash.substring(0, 16)}...
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground">
                        {log.timestamp.split(' ')[1]}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button variant="outline" size="sm" className="w-full mt-4">
                View Full Audit Log
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;