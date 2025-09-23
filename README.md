# AyurSutra - Panchakarma Patient Management & Therapy Scheduling Platform

🌿 **Ancient Wisdom, Modern Technology** - A comprehensive Ayurvedic patient management platform built with React, TypeScript, and cutting-edge healthcare technology.

![AyurSutra Dashboard](src/assets/hero-ayurveda.jpg)

## ✨ Features

- **Multi-Role Platform**: Patient, Practitioner, and Admin dashboards
- **Smart Scheduling**: AI-powered appointment booking with conflict detection
- **Progress Tracking**: Real-time therapy monitoring with sentiment analysis
- **Secure Records**: Blockchain-secured medical records with IPFS storage
- **AI Assistant**: Intelligent chatbot for guidance and support
- **Mock Services**: Complete demo environment with realistic data

## 🚀 Quick Start

### Demo Access (Instant!)

Visit the live demo and use these credentials:
- **Patient Demo**: `patient@demo.com` / `demo123`
- **Practitioner Demo**: `practitioner@demo.com` / `demo123`  
- **Admin Demo**: `admin@demo.com` / `demo123`

Or click the demo buttons on the login page!

### Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Start with mock services (recommended)
npm run start:mock
```

## 🏗️ Architecture

```
src/
├── assets/           # Generated Ayurvedic images
├── components/       # Reusable UI components
│   ├── Layout/       # Header, Footer
│   ├── ChatBot/      # AI assistant
│   └── ui/           # Shadcn components
├── pages/            # Route components
│   ├── Auth/         # Login, Register
│   ├── Patient/      # Patient dashboard
│   ├── Practitioner/ # Practitioner tools
│   └── Admin/        # Admin controls
├── services/         # Mock API services
├── stores/           # Zustand state management
└── hooks/            # Custom React hooks
```

## 🎯 Key Components

### For Patients
- ✅ Onboarding wizard with Prakriti assessment
- ✅ Appointment booking with calendar view
- ✅ Progress tracking with wellness charts
- ✅ Medical records with blockchain verification
- ✅ Feedback system with sentiment analysis

### For Practitioners  
- ✅ Patient queue management
- ✅ Real-time session monitoring
- ✅ Anomaly detection alerts
- ✅ Medical record uploads
- ✅ Availability management

### For Administrators
- ✅ System-wide analytics
- ✅ User management
- ✅ Audit log monitoring
- ✅ Access control management

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Custom Ayurvedic theme
- **UI**: Shadcn/ui components + Framer Motion
- **State**: Zustand + React Query
- **Charts**: Recharts + FullCalendar
- **Mock Data**: MSW + WebSocket simulation
- **Icons**: Lucide React

## 📱 Demo Features

### Live Demos
- **Real-time Progress**: Watch therapy sessions update live
- **AI Chat**: Smart responses based on context
- **Sentiment Analysis**: Automatic mood tracking
- **Blockchain UI**: Mock IPFS hashes and transaction verification
- **WebSocket Events**: Live notifications and updates

### Sample Data
- 3 Practitioners with different specialties
- 10+ Patients with complete health profiles  
- 30+ Appointments across different therapy types
- Medical records with mock blockchain hashes
- Feedback entries with sentiment scores

## 🎨 Design System

**Ayurvedic Color Palette:**
- Forest Green (Kapha) - Primary actions
- Warm Earth (Pitta) - Secondary elements  
- Golden Hues (Vata) - Accent colors
- Natural gradients and organic shapes
- Inter font for modern readability

## 🔐 Security Features (Mocked)

- **Blockchain Integration**: Mock IPFS storage with transaction hashes
- **Access Control**: Role-based permissions
- **Audit Logging**: Complete activity tracking
- **Data Encryption**: Simulated record encryption

## 📊 Analytics & Insights

- **Patient Progress**: Symptom tracking with trend analysis
- **Practitioner Metrics**: Session completion rates
- **Sentiment Analysis**: AI-powered mood assessment  
- **Anomaly Detection**: Automatic health alerts
- **System Performance**: Real-time monitoring

## 🚀 Getting Started Guide

1. **Clone & Install**
   ```bash
   git clone <repo-url>
   cd ayursutra
   npm install
   ```

2. **Start Development**
   ```bash
   npm run dev
   ```

3. **Try Demo Login**
   - Click any demo button on login page
   - Or use: `patient@demo.com` / `demo123`

4. **Explore Features**
   - Book appointments as patient
   - Monitor sessions as practitioner  
   - View system analytics as admin

## 📈 What's Next?

- **Refine & Customize**: Perfect the design and user experience
- **Add Real Services**: Connect to actual Supabase backend
- **Extend Features**: Add video consultations, payment processing
- **Scale Platform**: Multi-clinic support and advanced analytics

---

**Built with ❤️ for the Ayurvedic community**

*This is a demo platform showcasing modern healthcare technology applied to traditional Ayurvedic medicine. All data is mocked for demonstration purposes.*