import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Shield, Activity, Users, FileText, Bot, Droplets, Wind, CloudDrizzle, Feather, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/stores/auth';
import heroImage from '@/assets/hero-ayurveda.jpg';
import practitionerImage from '@/assets/practitioner-tech.jpg';
import therapyImage from '@/assets/therapy-room.jpg';

const panchakarmaFlashes = [
  {
    icon: Droplets,
    title: "Vamana (Therapeutic Emesis)",
    description: "Induced vomiting to eliminate excess mucus and toxins from the respiratory and digestive tract."
  },
  {
    icon: Wind,
    title: "Virechana (Purgation)",
    description: "Cleansing through controlled laxatives to remove toxins from the digestive system."
  },
  {
    icon: CloudDrizzle,
    title: "Basti (Medicated Enema)",
    description: "Herbal enemas to detoxify and balance the colon and lower body."
  },
  {
    icon: Feather,
    title: "Nasya (Nasal Administration)",
    description: "Medicinal oils or powders administered through the nose to clear toxins from the head and sinuses."
  },
  {
    icon: Thermometer,
    title: "Raktamokshana (Bloodletting)",
    description: "Controlled removal of impure blood to improve circulation and detoxify the bloodstream."
  }
];

const Index = () => {
  const { demoLogin } = useAuth();

  const features = [
    {
      icon: Calendar,
      title: 'Smart Scheduling',
      description: 'AI-powered appointment scheduling with Panchakarma therapy planning and conflict detection.'
    },
    {
      icon: Shield,
      title: 'Secure Records',
      description: 'Blockchain-secured medical records with IPFS storage and encrypted patient data.'
    },
    {
      icon: Activity,
      title: 'Progress Tracking',
      description: 'Real-time therapy progress monitoring with sentiment analysis and wellness metrics.'
    },
    {
      icon: Users,
      title: 'Multi-Role Platform',
      description: 'Unified platform for patients, practitioners, and administrators with role-based access.'
    },
    {
      icon: FileText,
      title: 'Digital Health Records',
      description: 'Complete digital health records with Ayurvedic assessment and treatment history.'
    },
    {
      icon: Bot,
      title: 'AI Assistant',
      description: 'Intelligent chatbot for appointment booking, treatment guidance, and wellness advice.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  <span className="text-primary">AyurSutra</span>
                  <br />
                  Ancient Wisdom,
                  <br />
                  Modern Care
                </h1>
                <p className="text-xl text-muted-foreground mt-6 max-w-2xl">
                  Comprehensive Panchakarma patient management platform that bridges 
                  traditional Ayurvedic healing with cutting-edge healthcare technology.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-gradient-primary hover:scale-105 transition-transform shadow-medium text-lg px-8 py-6"
                  asChild
                >
                  <Link to="/register">
                    Start Your Journey
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-large">
                <img 
                  src={heroImage}
                  alt="Serene Ayurvedic wellness center with Panchakarma therapy"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-card border border-border rounded-xl p-4 shadow-medium"
              >
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Live Session</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Panchakarma Flash Section */}
      <section className="py-12 bg-[#f6fff7]">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl font-bold text-green-700 mb-4">What is Panchakarma?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Panchakarma is a traditional Ayurvedic detoxification and rejuvenation therapy designed to cleanse the body of toxins, restore balance, and promote overall health. The term "Panchakarma" means "five actions" and refers to five therapeutic treatments:
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {panchakarmaFlashes.map((flash, idx) => (
              <motion.div
                key={flash.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center h-full hover:scale-105 transition-transform">
                  <div className="w-12 h-12 mb-4 flex items-center justify-center rounded-full bg-gradient-to-br from-green-200 to-green-400">
                    <flash.icon className="w-7 h-7 text-green-700" />
                  </div>
                  <div className="font-bold text-lg text-green-800 mb-2 text-center">{flash.title}</div>
                  <div className="text-gray-600 text-sm text-center">{flash.description}</div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8 text-gray-700 text-base max-w-2xl mx-auto">
            Panchakarma aims to restore balance to the body's doshas (Vata, Pitta, Kapha), strengthen immunity, and enhance vitality. It is typically customized based on individual health needs and requires professional supervision.
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Complete Healthcare Management
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Everything you need to manage Ayurvedic treatments, from patient onboarding 
                to therapy completion, all in one intelligent platform.
              </p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="hover-lift border-border h-full">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Preview Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-3xl font-bold text-foreground mb-6">
                For Healthcare Practitioners
              </h3>
              <p className="text-lg text-muted-foreground mb-8">
                Manage patient queues, track therapy progress, and maintain comprehensive 
                medical records with our practitioner-focused dashboard.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  'Real-time patient queue management',
                  'Integrated therapy progress tracking',
                  'Secure medical record uploads',
                  'AI-powered anomaly detection',
                  'Automated appointment scheduling'
                ].map((item) => (
                  <li key={item} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => demoLogin('practitioner')}
                className="hover-lift"
              >
                Try Practitioner Demo
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src={practitionerImage}
                alt="Modern Ayurvedic practitioner using technology"
                className="rounded-2xl shadow-large w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold text-foreground mb-6">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join healthcare practitioners who are already using AyurSutra to deliver 
              better patient care and streamline their Ayurvedic practice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:scale-105 transition-transform shadow-medium text-lg px-8 py-6"
                asChild
              >
                <Link to="/register">
                  Get Started Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild
                className="hover-lift"
              >
                <Link to="/contact">Contact Sales</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;