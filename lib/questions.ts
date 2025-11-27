export interface Question {
  id: string;
  question: string;
  options: {
    text: string;
    score: number;
  }[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
  questions: Question[];
}

export const assessmentCategories: Category[] = [
  {
    id: 'technology',
    name: 'Technology Infrastructure',
    description: 'Evaluate your organization\'s technology foundation and cloud readiness',
    questions: [
      {
        id: 'tech-1',
        question: 'How would you describe your current IT infrastructure?',
        options: [
          { text: 'Legacy systems with minimal integration', score: 1 },
          { text: 'Mix of legacy and modern systems', score: 2 },
          { text: 'Mostly modern with some legacy', score: 3 },
          { text: 'Modern cloud-based infrastructure', score: 4 },
          { text: 'Fully cloud-native and scalable', score: 5 },
        ],
      },
      {
        id: 'tech-2',
        question: 'What is your organization\'s approach to API and system integration?',
        options: [
          { text: 'No formal integration strategy', score: 1 },
          { text: 'Point-to-point integrations', score: 2 },
          { text: 'Some API usage with basic integration', score: 3 },
          { text: 'API-first approach with integration platform', score: 4 },
          { text: 'Comprehensive API ecosystem with microservices', score: 5 },
        ],
      },
      {
        id: 'tech-3',
        question: 'How does your organization handle cybersecurity?',
        options: [
          { text: 'Basic antivirus and firewall only', score: 1 },
          { text: 'Standard security protocols', score: 2 },
          { text: 'Regular security audits and updates', score: 3 },
          { text: 'Advanced threat detection and response', score: 4 },
          { text: 'Zero-trust architecture with AI-driven security', score: 5 },
        ],
      },
      {
        id: 'tech-4',
        question: 'What is your mobile and remote work capability?',
        options: [
          { text: 'Limited or no mobile/remote access', score: 1 },
          { text: 'Basic VPN access', score: 2 },
          { text: 'Mobile apps for key functions', score: 3 },
          { text: 'Comprehensive mobile-first solutions', score: 4 },
          { text: 'Seamless anywhere-anytime access', score: 5 },
        ],
      },
    ],
  },
  {
    id: 'data',
    name: 'Data Management',
    description: 'Assess your data strategy, analytics capabilities, and data governance',
    questions: [
      {
        id: 'data-1',
        question: 'How is data managed across your organization?',
        options: [
          { text: 'Siloed in departmental systems', score: 1 },
          { text: 'Some data sharing between departments', score: 2 },
          { text: 'Centralized data warehouse', score: 3 },
          { text: 'Integrated data lake with governance', score: 4 },
          { text: 'Real-time data fabric with AI-driven insights', score: 5 },
        ],
      },
      {
        id: 'data-2',
        question: 'What analytics capabilities does your organization have?',
        options: [
          { text: 'Basic reporting only', score: 1 },
          { text: 'Descriptive analytics and dashboards', score: 2 },
          { text: 'Diagnostic analytics with some automation', score: 3 },
          { text: 'Predictive analytics and modeling', score: 4 },
          { text: 'Prescriptive analytics with AI/ML', score: 5 },
        ],
      },
      {
        id: 'data-3',
        question: 'How does your organization ensure data quality and governance?',
        options: [
          { text: 'No formal data governance', score: 1 },
          { text: 'Basic data quality checks', score: 2 },
          { text: 'Defined data governance policies', score: 3 },
          { text: 'Automated data quality management', score: 4 },
          { text: 'Enterprise-wide data governance with AI validation', score: 5 },
        ],
      },
      {
        id: 'data-4',
        question: 'How accessible is data for decision-making?',
        options: [
          { text: 'Requires IT support for data access', score: 1 },
          { text: 'Limited self-service reporting', score: 2 },
          { text: 'Self-service BI tools available', score: 3 },
          { text: 'Real-time dashboards for all stakeholders', score: 4 },
          { text: 'AI-powered insights delivered proactively', score: 5 },
        ],
      },
    ],
  },
  {
    id: 'process',
    name: 'Process Automation',
    description: 'Evaluate automation maturity and process optimization',
    questions: [
      {
        id: 'process-1',
        question: 'What level of process automation exists in your organization?',
        options: [
          { text: 'Mostly manual processes', score: 1 },
          { text: 'Some basic automation (e.g., email workflows)', score: 2 },
          { text: 'Robotic Process Automation (RPA) for repetitive tasks', score: 3 },
          { text: 'Intelligent automation with business rules', score: 4 },
          { text: 'End-to-end AI-driven process automation', score: 5 },
        ],
      },
      {
        id: 'process-2',
        question: 'How are business processes documented and optimized?',
        options: [
          { text: 'Undocumented or tribal knowledge', score: 1 },
          { text: 'Basic documentation exists', score: 2 },
          { text: 'Formal process mapping and documentation', score: 3 },
          { text: 'Continuous process improvement program', score: 4 },
          { text: 'AI-driven process mining and optimization', score: 5 },
        ],
      },
      {
        id: 'process-3',
        question: 'How does your organization handle workflow management?',
        options: [
          { text: 'Email and spreadsheets', score: 1 },
          { text: 'Basic workflow tools', score: 2 },
          { text: 'Workflow management system in place', score: 3 },
          { text: 'Integrated BPM platform', score: 4 },
          { text: 'Intelligent workflow orchestration with AI', score: 5 },
        ],
      },
      {
        id: 'process-4',
        question: 'What is your approach to process monitoring and improvement?',
        options: [
          { text: 'No formal monitoring', score: 1 },
          { text: 'Periodic manual reviews', score: 2 },
          { text: 'KPI tracking and reporting', score: 3 },
          { text: 'Real-time process analytics', score: 4 },
          { text: 'Predictive analytics with automated optimization', score: 5 },
        ],
      },
    ],
  },
  {
    id: 'customer',
    name: 'Customer Experience',
    description: 'Measure digital customer engagement and omnichannel capabilities',
    questions: [
      {
        id: 'customer-1',
        question: 'How do customers interact with your organization?',
        options: [
          { text: 'Primarily in-person or phone', score: 1 },
          { text: 'Basic website and email', score: 2 },
          { text: 'Multiple digital channels available', score: 3 },
          { text: 'Integrated omnichannel experience', score: 4 },
          { text: 'AI-powered personalized experiences across all channels', score: 5 },
        ],
      },
      {
        id: 'customer-2',
        question: 'How personalized is your customer experience?',
        options: [
          { text: 'One-size-fits-all approach', score: 1 },
          { text: 'Basic segmentation', score: 2 },
          { text: 'Targeted campaigns based on demographics', score: 3 },
          { text: 'Behavioral personalization', score: 4 },
          { text: 'Real-time AI-driven hyper-personalization', score: 5 },
        ],
      },
      {
        id: 'customer-3',
        question: 'What customer self-service capabilities do you offer?',
        options: [
          { text: 'None - all interactions require staff', score: 1 },
          { text: 'Basic FAQ or knowledge base', score: 2 },
          { text: 'Self-service portal for common tasks', score: 3 },
          { text: 'Comprehensive self-service with chatbots', score: 4 },
          { text: 'AI-powered virtual assistants with natural language', score: 5 },
        ],
      },
      {
        id: 'customer-4',
        question: 'How do you gather and act on customer feedback?',
        options: [
          { text: 'Informal or no systematic feedback', score: 1 },
          { text: 'Periodic surveys', score: 2 },
          { text: 'Regular feedback collection and analysis', score: 3 },
          { text: 'Real-time feedback with closed-loop processes', score: 4 },
          { text: 'AI-driven sentiment analysis with predictive insights', score: 5 },
        ],
      },
    ],
  },
  {
    id: 'workforce',
    name: 'Workforce Digital Skills',
    description: 'Evaluate digital literacy, training, and culture of innovation',
    questions: [
      {
        id: 'workforce-1',
        question: 'What is the overall digital literacy level of your workforce?',
        options: [
          { text: 'Low - significant training needed', score: 1 },
          { text: 'Basic digital skills', score: 2 },
          { text: 'Moderate - comfortable with standard tools', score: 3 },
          { text: 'High - proficient with advanced tools', score: 4 },
          { text: 'Expert - driving digital innovation', score: 5 },
        ],
      },
      {
        id: 'workforce-2',
        question: 'How does your organization approach digital skills training?',
        options: [
          { text: 'No formal training program', score: 1 },
          { text: 'Ad-hoc training as needed', score: 2 },
          { text: 'Regular training programs available', score: 3 },
          { text: 'Comprehensive learning management system', score: 4 },
          { text: 'Personalized AI-driven continuous learning', score: 5 },
        ],
      },
      {
        id: 'workforce-3',
        question: 'How collaborative is your digital work environment?',
        options: [
          { text: 'Minimal collaboration tools', score: 1 },
          { text: 'Basic email and file sharing', score: 2 },
          { text: 'Collaboration platforms (Teams, Slack, etc.)', score: 3 },
          { text: 'Integrated digital workplace', score: 4 },
          { text: 'AI-enhanced collaboration with knowledge management', score: 5 },
        ],
      },
      {
        id: 'workforce-4',
        question: 'How does your organization foster innovation and digital culture?',
        options: [
          { text: 'Resistant to change', score: 1 },
          { text: 'Open to change but slow to adopt', score: 2 },
          { text: 'Encourages innovation with some initiatives', score: 3 },
          { text: 'Strong innovation culture with dedicated resources', score: 4 },
          { text: 'Innovation-first culture with experimentation at scale', score: 5 },
        ],
      },
    ],
  },
];

export const getMaturityLevel = (score: number): { level: string; description: string; color: string } => {
  if (score >= 90) {
    return {
      level: 'Digital Leader',
      description: 'Your organization is at the forefront of digital transformation with advanced capabilities across all areas.',
      color: '#10b981',
    };
  } else if (score >= 70) {
    return {
      level: 'Digital Advanced',
      description: 'Strong digital capabilities with room for optimization in specific areas.',
      color: '#3b82f6',
    };
  } else if (score >= 50) {
    return {
      level: 'Digital Intermediate',
      description: 'Solid foundation with significant opportunities for digital advancement.',
      color: '#f59e0b',
    };
  } else if (score >= 30) {
    return {
      level: 'Digital Emerging',
      description: 'Beginning the digital journey with foundational capabilities in place.',
      color: '#ef4444',
    };
  } else {
    return {
      level: 'Digital Beginner',
      description: 'Significant digital transformation needed across all areas.',
      color: '#dc2626',
    };
  }
};

export const getRecommendations = (categoryScores: { [key: string]: number }): string[] => {
  const recommendations: string[] = [];
  
  Object.entries(categoryScores).forEach(([categoryId, score]) => {
    const category = assessmentCategories.find(c => c.id === categoryId);
    if (!category) return;
    
    const percentage = (score / 20) * 100;
    
    if (categoryId === 'technology' && percentage < 70) {
      recommendations.push(
        `Technology Infrastructure: ${percentage < 40 ? 'Prioritize' : 'Consider'} migrating to cloud-based infrastructure and implementing API-first architecture for better scalability and integration.`
      );
    }
    
    if (categoryId === 'data' && percentage < 70) {
      recommendations.push(
        `Data Management: ${percentage < 40 ? 'Urgently implement' : 'Enhance'} data governance practices and invest in analytics capabilities to enable data-driven decision making.`
      );
    }
    
    if (categoryId === 'process' && percentage < 70) {
      recommendations.push(
        `Process Automation: ${percentage < 40 ? 'Begin with' : 'Expand'} RPA initiatives and implement intelligent automation to improve efficiency and reduce manual work.`
      );
    }
    
    if (categoryId === 'customer' && percentage < 70) {
      recommendations.push(
        `Customer Experience: ${percentage < 40 ? 'Develop' : 'Optimize'} omnichannel capabilities and implement personalization strategies to enhance customer engagement.`
      );
    }
    
    if (categoryId === 'workforce' && percentage < 70) {
      recommendations.push(
        `Workforce Digital Skills: ${percentage < 40 ? 'Launch' : 'Strengthen'} comprehensive digital training programs and foster a culture of continuous learning and innovation.`
      );
    }
  });
  
  return recommendations;
};
