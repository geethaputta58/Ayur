// Mock API service for AyurSutra platform
export interface Appointment {
  id: string;
  patientId: string;
  practitionerId: string;
  patientName: string;
  practitionerName: string;
  date: string;
  time: string;
  duration: number; // minutes
  type: 'consultation' | 'panchakarma' | 'follow-up' | 'teleconsult';
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  notes?: string;
  sessionProgress?: number; // 0-100
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  uploadedBy: string;
  uploadedByName: string;
  filename: string;
  type: 'lab-report' | 'prescription' | 'xray' | 'consultation-notes';
  uploadDate: string;
  ipfsHash: string;
  txHash: string;
  isEncrypted: boolean;
  accessGranted: string[]; // practitioner IDs with access
}

export interface FeedbackEntry {
  id: string;
  patientId: string;
  appointmentId: string;
  rating: number; // 1-5
  comment: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  sentimentScore: number;
  date: string;
  symptoms?: {
    pain: number; // 1-10
    energy: number; // 1-10
    mood: number; // 1-10
    sleep: number; // 1-10
  };
}

export interface PractitionerAvailability {
  id: string;
  practitionerId: string;
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

// Mock data
const mockAppointments: Appointment[] = [
  {
    id: 'apt-1',
    patientId: 'patient-1',
    practitionerId: 'prac-1',
    patientName: 'Priya Sharma',
    practitionerName: 'Dr. Rajesh Gupta',
    date: '2024-01-15',
    time: '10:00',
    duration: 60,
    type: 'panchakarma',
    status: 'scheduled',
    notes: 'Vamana therapy session 2/5'
  },
  {
    id: 'apt-2',
    patientId: 'patient-2',
    practitionerId: 'prac-1',
    patientName: 'Amit Kumar',
    practitionerName: 'Dr. Rajesh Gupta',
    date: '2024-01-15',
    time: '11:30',
    duration: 45,
    type: 'consultation',
    status: 'in-progress',
    sessionProgress: 65
  }
];

const mockRecords: MedicalRecord[] = [
  {
    id: 'rec-1',
    patientId: 'patient-1',
    uploadedBy: 'prac-1',
    uploadedByName: 'Dr. Rajesh Gupta',
    filename: 'lab-report-2024-01-10.pdf',
    type: 'lab-report',
    uploadDate: '2024-01-10T09:30:00Z',
    ipfsHash: 'QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG',
    txHash: '0xDEADBEEF1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF12345678',
    isEncrypted: true,
    accessGranted: ['prac-1', 'patient-1']
  }
];

const mockFeedback: FeedbackEntry[] = [
  {
    id: 'fb-1',
    patientId: 'patient-1',
    appointmentId: 'apt-1',
    rating: 5,
    comment: 'Excellent session, feeling much better after the treatment.',
    sentiment: 'positive',
    sentimentScore: 0.8,
    date: '2024-01-10T14:30:00Z',
    symptoms: { pain: 3, energy: 8, mood: 8, sleep: 7 }
  }
];

// Mock API functions
export const mockApi = {
  // Appointments
  getAppointments: async (userId: string, role: string): Promise<Appointment[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (role === 'patient') {
      return mockAppointments.filter(apt => apt.patientId === userId);
    } else if (role === 'practitioner') {
      return mockAppointments.filter(apt => apt.practitionerId === userId);
    }
    return mockAppointments;
  },

  bookAppointment: async (appointment: Omit<Appointment, 'id'>): Promise<Appointment> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const newAppointment: Appointment = {
      ...appointment,
      id: `apt-${Date.now()}`,
      status: 'scheduled'
    };
    
    mockAppointments.push(newAppointment);
    return newAppointment;
  },

  updateAppointmentProgress: async (id: string, progress: number): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const appointment = mockAppointments.find(apt => apt.id === id);
    if (appointment) {
      appointment.sessionProgress = progress;
      if (progress >= 100) {
        appointment.status = 'completed';
      }
    }
  },

  // Medical Records
  getRecords: async (patientId: string): Promise<MedicalRecord[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockRecords.filter(record => record.patientId === patientId);
  },

  uploadRecord: async (file: File, patientId: string, uploadedBy: string): Promise<MedicalRecord> => {
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate upload time
    
    const newRecord: MedicalRecord = {
      id: `rec-${Date.now()}`,
      patientId,
      uploadedBy,
      uploadedByName: 'Dr. Rajesh Gupta',
      filename: file.name,
      type: 'consultation-notes',
      uploadDate: new Date().toISOString(),
      ipfsHash: `QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG${Date.now()}`,
      txHash: `0xDEADBEEF${Date.now().toString(16).toUpperCase()}1234567890ABCDEF`,
      isEncrypted: true,
      accessGranted: [uploadedBy, patientId]
    };
    
    mockRecords.push(newRecord);
    return newRecord;
  },

  // Feedback
  submitFeedback: async (feedback: Omit<FeedbackEntry, 'id' | 'sentiment' | 'sentimentScore'>): Promise<FeedbackEntry> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    // Mock sentiment analysis
    const sentiment = feedback.rating >= 4 ? 'positive' : feedback.rating === 3 ? 'neutral' : 'negative';
    const sentimentScore = feedback.rating / 5;
    
    const newFeedback: FeedbackEntry = {
      ...feedback,
      id: `fb-${Date.now()}`,
      sentiment,
      sentimentScore,
      date: new Date().toISOString()
    };
    
    mockFeedback.push(newFeedback);
    return newFeedback;
  },

  getFeedback: async (patientId: string): Promise<FeedbackEntry[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockFeedback.filter(fb => fb.patientId === patientId);
  },

  // AI Chat
  chatWithAI: async (message: string, context?: any): Promise<string> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock AI responses based on keywords
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('appointment') || lowerMessage.includes('schedule')) {
      return "I can help you schedule an appointment. Dr. Rajesh Gupta has availability tomorrow at 10:00 AM and 2:00 PM. Would you like me to book one of these slots?";
    }
    
    if (lowerMessage.includes('pain') || lowerMessage.includes('symptoms')) {
      return "I understand you're experiencing discomfort. For immediate relief, try gentle breathing exercises. However, I recommend scheduling a consultation with your practitioner for proper assessment and treatment.";
    }
    
    if (lowerMessage.includes('panchakarma') || lowerMessage.includes('treatment')) {
      return "Panchakarma is a comprehensive detoxification and rejuvenation therapy. Before your session, please fast for 8 hours and avoid strenuous activities. Drink plenty of warm water throughout the day.";
    }
    
    return "Thank you for your question. I'm here to help with scheduling, treatment guidance, and general wellness advice. Is there something specific I can assist you with today?";
  }
};

// Mock WebSocket service
export class MockWebSocketService {
  private listeners: { [key: string]: ((data: any) => void)[] } = {};
  
  on(event: string, callback: (data: any) => void) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }
  
  off(event: string, callback: (data: any) => void) {
    if (this.listeners[event]) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
    }
  }
  
  emit(event: string, data: any) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }
  
  // Simulate real-time session progress
  simulateSessionProgress(appointmentId: string) {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
      }
      
      this.emit(`session:${appointmentId}`, {
        type: 'progress',
        progress: Math.round(progress)
      });
      
      if (progress >= 100) {
        this.emit(`session:${appointmentId}`, {
          type: 'completed',
          message: 'Session completed successfully'
        });
      }
    }, 2000);
  }
  
  // Simulate notifications
  simulateNotification(userId: string, message: string, type: 'reminder' | 'alert' | 'message' = 'message') {
    setTimeout(() => {
      this.emit(`notifications:${userId}`, {
        id: `notif-${Date.now()}`,
        type,
        message,
        timestamp: new Date().toISOString()
      });
    }, 1000);
  }
}

export const mockWebSocket = new MockWebSocketService();