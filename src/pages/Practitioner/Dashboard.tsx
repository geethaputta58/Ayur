import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Calendar, 
  AlertTriangle, 
  TrendingUp,
  Clock,
  CheckCircle,
  Activity,
  MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useAuth } from '@/stores/auth';
import { mockApi, type Appointment } from '@/services/mockApi';
import { useToast } from '@/hooks/use-toast';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const PractitionerDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      const appointmentsData = await mockApi.getAppointments(user!.id, 'practitioner');
      setAppointments(appointmentsData);
    } catch (error) {
      toast({
        title: "Error loading dashboard",
        description: "Please refresh the page to try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProgress = async (appointmentId: string, progress: number) => {
    try {
      await mockApi.updateAppointmentProgress(appointmentId, progress);
      // Refresh appointments
      loadDashboardData();
      toast({
        title: "Progress updated",
        description: "Session progress has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error updating progress",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  // Mock data for charts
  const weeklyAppointments = [
    { day: 'Mon', appointments: 8, completed: 7 },
    { day: 'Tue', appointments: 12, completed: 10 },
    { day: 'Wed', appointments: 10, completed: 9 },
    { day: 'Thu', appointments: 15, completed: 13 },
    { day: 'Fri', appointments: 9, completed: 8 },
    { day: 'Sat', appointments: 6, completed: 5 },
    { day: 'Sun', appointments: 4, completed: 4 },
  ];

  const sentimentTrend = [
    { week: 'W1', positive: 75, neutral: 15, negative: 10 },
    { week: 'W2', positive: 78, neutral: 12, negative: 10 },
    { week: 'W3', positive: 82, neutral: 10, negative: 8 },
    { week: 'W4', positive: 85, neutral: 10, negative: 5 },
  ];

  const todayAppointments = appointments.filter(apt => apt.date === '2024-01-15');
  const inProgressAppointments = appointments.filter(apt => apt.status === 'in-progress');
  const completedToday = todayAppointments.filter(apt => apt.status === 'completed').length;
  const totalToday = todayAppointments.length;

  const chartConfig = {
    appointments: { label: "Scheduled", color: "hsl(var(--primary))" },
    completed: { label: "Completed", color: "hsl(var(--success))" },
    positive: { label: "Positive", color: "hsl(var(--success))" },
  };

  // Mock anomaly alerts
  const anomalies = [
    {
      patientName: "Priya Sharma",
      reason: "Pain score increased from 3 to 8 in last session",
      severity: "high",
      time: "2 hours ago"
    },
    {
      patientName: "Amit Kumar",
      reason: "Missed 2 consecutive appointments",
      severity: "medium",
      time: "1 day ago"
    }
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="h-20 bg-muted rounded-t-lg"></CardHeader>
              <CardContent className="h-32 bg-muted/50"></CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl font-bold text-foreground">
          Good morning, Dr. {user?.name?.split(' ')[1]}! 🙏
        </h1>
        <p className="text-muted-foreground">
          You have {totalToday} appointments today. {inProgressAppointments.length} sessions currently in progress.
        </p>
      </motion.div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Queue</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalToday}</div>
              <p className="text-xs text-muted-foreground">
                {completedToday} completed, {totalToday - completedToday} remaining
              </p>
              <div className="flex items-center mt-2">
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: `${(completedToday / totalToday) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-muted-foreground ml-2">
                  {Math.round((completedToday / totalToday) * 100)}%
                </span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">under your care</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-3 h-3 text-success mr-1" />
                <span className="text-xs text-success">+3 this week</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Patient Sentiment</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">85%</div>
              <p className="text-xs text-muted-foreground">positive feedback</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-3 h-3 text-success mr-1" />
                <span className="text-xs text-success">+7% this month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="hover-lift border-destructive/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Anomaly Alerts</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{anomalies.length}</div>
              <p className="text-xs text-muted-foreground">require attention</p>
              <Button size="sm" variant="outline" className="mt-2 text-destructive border-destructive/50">
                View All
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Sessions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Active Sessions
              </CardTitle>
              <CardDescription>
                Live session monitoring and progress tracking
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {inProgressAppointments.length > 0 ? (
                inProgressAppointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 border border-border rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{appointment.patientName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {appointment.type} • Room 2A
                        </p>
                      </div>
                      <Badge variant="secondary">
                        <Clock className="w-3 h-3 mr-1" />
                        In Progress
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Session Progress</span>
                        <span>{appointment.sessionProgress || 45}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${appointment.sessionProgress || 45}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleUpdateProgress(appointment.id, 100)}
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Mark Complete
                      </Button>
                      <Button size="sm" variant="outline">
                        Add Notes
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No active sessions at the moment</p>
                  <p className="text-sm">Your next appointment starts in 30 minutes</p>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Anomaly Alerts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <AlertTriangle className="w-5 h-5" />
                Anomaly Alerts
              </CardTitle>
              <CardDescription>
                Patients requiring immediate attention
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {anomalies.map((anomaly, index) => (
                <div key={index} className="p-3 border border-destructive/20 rounded-lg bg-destructive/5">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-sm">{anomaly.patientName}</h4>
                    <Badge 
                      variant={anomaly.severity === 'high' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {anomaly.severity}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {anomaly.reason}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{anomaly.time}</span>
                    <Button size="sm" variant="outline" className="text-xs h-6">
                      Review
                    </Button>
                  </div>
                </div>
              ))}
              
              <Button variant="outline" className="w-full" size="sm">
                View All Alerts
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Weekly Appointments</CardTitle>
              <CardDescription>
                Scheduled vs completed appointments this week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyAppointments}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
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
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Patient Sentiment Trend</CardTitle>
              <CardDescription>
                Feedback sentiment analysis over the past month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sentimentTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis domain={[0, 100]} />
                    <Line 
                      type="monotone" 
                      dataKey="positive" 
                      stroke="var(--color-positive)" 
                      strokeWidth={3}
                      dot={{ fill: "var(--color-positive)", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PractitionerDashboard;