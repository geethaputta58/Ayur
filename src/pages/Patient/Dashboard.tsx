import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  Activity, 
  Heart, 
  FileText, 
  Clock, 
  TrendingUp,
  Award,
  AlertCircle,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useAuth } from '@/stores/auth';
import { mockApi, type Appointment, type FeedbackEntry } from '@/services/mockApi';
import { useToast } from '@/hooks/use-toast';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const PatientDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [feedback, setFeedback] = useState<FeedbackEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      const [appointmentsData, feedbackData] = await Promise.all([
        mockApi.getAppointments(user!.id, 'patient'),
        mockApi.getFeedback(user!.id)
      ]);
      
      setAppointments(appointmentsData);
      setFeedback(feedbackData);
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

  // Mock data for charts
  const symptomTrendData = [
    { date: '2024-01-01', pain: 7, energy: 4, mood: 5, sleep: 3 },
    { date: '2024-01-08', pain: 6, energy: 5, mood: 6, sleep: 4 },
    { date: '2024-01-15', pain: 4, energy: 7, mood: 7, sleep: 6 },
    { date: '2024-01-22', pain: 3, energy: 8, mood: 8, sleep: 7 },
  ];

  const completionData = [
    { name: 'Completed', value: 75, color: 'hsl(var(--success))' },
    { name: 'Remaining', value: 25, color: 'hsl(var(--muted))' }
  ];

  const upcomingAppointment = appointments.find(apt => apt.status === 'scheduled');
  const completedSessions = appointments.filter(apt => apt.status === 'completed').length;
  const totalSessions = appointments.length;
  const avgSentiment = feedback.length > 0 
    ? feedback.reduce((sum, fb) => sum + fb.sentimentScore, 0) / feedback.length 
    : 0;

  const chartConfig = {
    pain: { label: "Pain Level", color: "hsl(var(--destructive))" },
    energy: { label: "Energy", color: "hsl(var(--success))" },
    mood: { label: "Mood", color: "hsl(var(--primary))" },
    sleep: { label: "Sleep Quality", color: "hsl(var(--accent))" },
  };

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
          Welcome back, {user?.name?.split(' ')[0]}! 🙏
        </h1>
        <p className="text-muted-foreground">
          Track your wellness journey and stay connected with your Ayurvedic care team.
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
              <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {upcomingAppointment ? (
                <div>
                  <div className="text-2xl font-bold">{upcomingAppointment.date}</div>
                  <p className="text-xs text-muted-foreground">
                    {upcomingAppointment.time} - {upcomingAppointment.type}
                  </p>
                  <p className="text-sm text-primary font-medium mt-1">
                    Dr. {upcomingAppointment.practitionerName}
                  </p>
                </div>
              ) : (
                <div>
                  <div className="text-2xl font-bold">No upcoming</div>
                  <p className="text-xs text-muted-foreground">appointments</p>
                  <Button size="sm" className="mt-2" variant="outline">
                    <Plus className="w-3 h-3 mr-1" />
                    Book Now
                  </Button>
                </div>
              )}
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
              <CardTitle className="text-sm font-medium">Treatment Progress</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedSessions}/{totalSessions}</div>
              <p className="text-xs text-muted-foreground">sessions completed</p>
              <Progress value={(completedSessions / totalSessions) * 100} className="mt-2" />
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
              <CardTitle className="text-sm font-medium">Wellness Score</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {Math.round(avgSentiment * 100)}%
              </div>
              <p className="text-xs text-muted-foreground">based on feedback</p>
              <div className="flex items-center mt-2">
                <TrendingUp className="w-3 h-3 text-success mr-1" />
                <span className="text-xs text-success">+12% this month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="hover-lift">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Achievements</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">milestones reached</p>
              <div className="flex space-x-1 mt-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xs text-primary-foreground">🏆</span>
                </div>
                <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                  <span className="text-xs text-success-foreground">⭐</span>
                </div>
                <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-xs">🌟</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Symptom Tracking</CardTitle>
              <CardDescription>
                Monitor your progress across key wellness indicators
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={symptomTrendData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Line 
                      type="monotone" 
                      dataKey="pain" 
                      stroke="var(--color-pain)" 
                      strokeWidth={2} 
                      dot={{ fill: "var(--color-pain)" }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="energy" 
                      stroke="var(--color-energy)" 
                      strokeWidth={2} 
                      dot={{ fill: "var(--color-energy)" }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="mood" 
                      stroke="var(--color-mood)" 
                      strokeWidth={2} 
                      dot={{ fill: "var(--color-mood)" }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="sleep" 
                      stroke="var(--color-sleep)" 
                      strokeWidth={2} 
                      dot={{ fill: "var(--color-sleep)" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Treatment Completion</CardTitle>
              <CardDescription>
                Your overall progress in the Panchakarma program
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={{}} className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={completionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {completionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
              <div className="text-center mt-4">
                <div className="text-2xl font-bold text-primary">75%</div>
                <p className="text-sm text-muted-foreground">Program completion</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions & Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Today's Reminders
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Pre-procedure preparation</p>
                  <p className="text-sm text-muted-foreground">
                    Please fast 8 hours before your Vamana session tomorrow at 10:00 AM
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Due in 14 hours</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Daily meditation</p>
                  <p className="text-sm text-muted-foreground">
                    Complete your 15-minute mindfulness session
                  </p>
                  <Button size="sm" variant="outline" className="mt-2">
                    Start Now
                  </Button>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-success rounded-full mt-2"></div>
                <div>
                  <p className="font-medium">Herbal medicine</p>
                  <p className="text-sm text-muted-foreground">
                    Take Triphala churna with warm water (Evening dose)
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">Best taken after dinner</p>
                </div>
              </div>
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
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Book Appointment
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                View Records
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Heart className="w-4 h-4 mr-2" />
                Submit Feedback
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <AlertCircle className="w-4 h-4 mr-2" />
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default PatientDashboard;