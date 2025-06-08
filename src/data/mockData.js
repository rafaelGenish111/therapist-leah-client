// src/data/mockData.js

export const mockUser = {
  username: 'לאה גניש',
  role: 'admin',
  email: 'leah@example.co.il',
  lastLogin: '2025-01-08T14:30:00Z'
};

export const mockStats = {
  articles: {
    total: 25,
    published: 20,
    drafts: 5,
    totalViews: 1245,
    popularArticles: [
      {
        _id: '1',
        title: 'היתרונות של עיסוי שוודי',
        views: 245,
        createdAt: '2025-01-03T09:00:00Z'
      },
      {
        _id: '2',
        title: 'איך להתכונן לטיפול עיסוי',
        views: 189,
        createdAt: '2025-01-02T16:30:00Z'
      },
      {
        _id: '3',
        title: 'עיסוי לנשים בהריון - מדריך מלא',
        views: 156,
        createdAt: '2024-12-28T11:15:00Z'
      }
    ]
  },
  gallery: {
    total: 150,
    visible: 135,
    hidden: 15,
    totalSize: 45.6,
    recentImages: [
      {
        _id: '1',
        originalName: 'חדר טיפולים מספר 1',
        category: 'clinic',
        uploadedAt: '2025-01-01T12:00:00Z'
      },
      {
        _id: '2',
        originalName: 'שמנים לעיסוי',
        category: 'equipment',
        uploadedAt: '2024-12-30T14:30:00Z'
      }
    ]
  },
  declarations: {
    total: 89,
    thisWeek: 12,
    thisMonth: 45,
    today: 3
  }
};

export const mockDeclarations = [
  {
    _id: '1',
    fullName: 'יהודית כהן',
    idNumber: '123456789',
    phoneNumber: '050-1234567',
    createdAt: '2025-01-05T10:30:00Z',
    healthConditions: {
      skinDiseases: false,
      heartDiseases: true,
      diabetes: false,
      bloodPressure: true,
      spineProblems: false,
      fracturesOrSprains: false,
      fluFeverInflammation: false,
      epilepsy: false,
      surgeries: {
        hasSurgeries: true,
        details: 'ניתוח ברך שמאל ב-2022'
      },
      chronicMedications: false,
      pregnancy: false,
      otherMedicalIssues: {
        hasOtherIssues: false,
        details: ''
      }
    },
    declarationConfirmed: true,
    signature: 'יהודית כהן',
    ipAddress: '192.168.1.1'
  },
  {
    _id: '2',
    fullName: 'דוד לוי',
    idNumber: '987654321',
    phoneNumber: '052-9876543',
    createdAt: '2025-01-04T14:15:00Z',
    healthConditions: {
      skinDiseases: false,
      heartDiseases: false,
      diabetes: false,
      bloodPressure: false,
      spineProblems: true,
      fracturesOrSprains: true,
      fluFeverInflammation: false,
      epilepsy: false,
      surgeries: {
        hasSurgeries: false,
        details: ''
      },
      chronicMedications: true,
      pregnancy: false,
      otherMedicalIssues: {
        hasOtherIssues: true,
        details: 'כאבי ראש כרוניים'
      }
    },
    declarationConfirmed: true,
    signature: 'דוד לוי',
    ipAddress: '192.168.1.2'
  },
  {
    _id: '3',
    fullName: 'מרים אברהם',
    idNumber: '555666777',
    phoneNumber: '054-5556677',
    createdAt: '2025-01-03T09:45:00Z',
    healthConditions: {
      skinDiseases: true,
      heartDiseases: false,
      diabetes: true,
      bloodPressure: false,
      spineProblems: false,
      fracturesOrSprains: false,
      fluFeverInflammation: false,
      epilepsy: false,
      surgeries: {
        hasSurgeries: false,
        details: ''
      },
      chronicMedications: true,
      pregnancy: false,
      otherMedicalIssues: {
        hasOtherIssues: false,
        details: ''
      }
    },
    declarationConfirmed: true,
    signature: 'מרים אברהם',
    ipAddress: '192.168.1.3'
  }
];

export const mockArticles = [
  {
    _id: '1',
    title: 'היתרונות של עיסוי שוודי',
    content: 'עיסוי שוודי הוא אחד מסוגי העיסוי הפופולריים ביותר בעולם. הוא משלב תנועות עדינות וזורמות עם לחץ בינוני, ומסייע בהרפיה עמוקה של השרירים. העיסוי השוודי מתמקד בשיפור זרימת הדם, הפחתת מתחים והקלה על כאבי שרירים כרוניים...',
    isPublished: true,
    views: 245,
    tags: ['עיסוי', 'שוודי', 'הרפיה', 'בריאות'],
    createdAt: '2025-01-03T09:00:00Z',
    updatedAt: '2025-01-03T09:00:00Z',
    author: {
      _id: 'user1',
      username: 'לאה גניש'
    },
    image: 'swedish-massage.jpg'
  },
  {
    _id: '2',
    title: 'איך להתכונן לטיפול עיסוי',
    content: 'הכנה נכונה לטיפול עיסוי יכולה להשפיע משמעותית על התוצאות והחוויה הכללית. ראשית, חשוב להגיע רגועים ובלי לחץ זמן. מומלץ לשתות הרבה מים לפני הטיפול ולהימנע מאכילה כבדה שעתיים לפני המפגש...',
    isPublished: false,
    views: 0,
    tags: ['הכנה', 'טיפול', 'עצות'],
    createdAt: '2025-01-02T16:30:00Z',
    updatedAt: '2025-01-02T16:30:00Z',
    author: {
      _id: 'user1',
      username: 'לאה גניש'
    },
    image: null
  },
  {
    _id: '3',
    title: 'עיסוי לנשים בהריון - מדריך מלא',
    content: 'עיסוי במהלך ההריון הוא דרך נפלאה להקל על אי הנוחות הגופנית ולהפחית מתח ולחץ. עם זאת, חשוב לדעת שעיסוי להריון דורש גישה מיוחדת וזהירות רבה. הטיפול מותאם במיוחד לצרכים המשתנים של הגוף במהלך תקופות שונות של ההריון...',
    isPublished: true,
    views: 156,
    tags: ['הריון', 'נשים', 'עיסוי מיוחד', 'בטיחות'],
    createdAt: '2024-12-28T11:15:00Z',
    updatedAt: '2024-12-28T11:15:00Z',
    author: {
      _id: 'user1',
      username: 'לאה גניש'
    },
    image: 'pregnancy-massage.jpg'
  },
  {
    _id: '4',
    title: 'טיפול בכאבי גב עם עיסוי רקמות עמוקות',
    content: 'כאבי גב הם אחת הבעיות הנפוצות ביותר בעידן המודרני, במיוחד בקרב אנשים העובדים בישיבה ממושכת. עיסוי רקמות עמוקות הוא טכניקה יעילה במיוחד לטיפול בכאבי גב כרוניים...',
    isPublished: true,
    views: 134,
    tags: ['כאבי גב', 'רקמות עמוקות', 'כאב כרוני'],
    createdAt: '2024-12-25T14:20:00Z',
    updatedAt: '2024-12-25T14:20:00Z',
    author: {
      _id: 'user1',
      username: 'לאה גניש'
    },
    image: 'deep-tissue.jpg'
  }
];

export const mockImages = [
  {
    _id: '1',
    filename: 'clinic-room-1.jpg',
    originalName: 'חדר טיפולים מספר 1',
    description: 'חדר הטיפולים הראשי של הקליניקה עם תאורה רכה ואווירה מרגיעה',
    category: 'clinic',
    uploadedAt: '2025-01-01T12:00:00Z',
    isVisible: true,
    size: 2456789,
    mimeType: 'image/jpeg',
    uploadedBy: {
      _id: 'user1',
      username: 'לאה גניש'
    }
  },
  {
    _id: '2',
    filename: 'massage-oils.jpg',
    originalName: 'שמנים לעיסוי',
    description: 'מגוון שמנים טבעיים לעיסוי מרגיע',
    category: 'equipment',
    uploadedAt: '2024-12-30T14:30:00Z',
    isVisible: true,
    size: 1234567,
    mimeType: 'image/jpeg',
    uploadedBy: {
      _id: 'user1',
      username: 'לאה גניש'
    }
  },
  {
    _id: '3',
    filename: 'treatment-table.jpg',
    originalName: 'מיטת טיפולים מקצועית',
    description: 'מיטת טיפולים ארגונומית ונוחה',
    category: 'equipment',
    uploadedAt: '2024-12-28T10:15:00Z',
    isVisible: true,
    size: 3456789,
    mimeType: 'image/jpeg',
    uploadedBy: {
      _id: 'user1',
      username: 'לאה גניש'
    }
  },
  {
    _id: '4',
    filename: 'waiting-area.jpg',
    originalName: 'אזור המתנה',
    description: 'אזור המתנה נוח ומזמין עם כורסאות רכות',
    category: 'clinic',
    uploadedAt: '2024-12-26T16:45:00Z',
    isVisible: false,
    size: 2789123,
    mimeType: 'image/jpeg',
    uploadedBy: {
      _id: 'user1',
      username: 'לאה גניש'
    }
  },
  {
    _id: '5',
    filename: 'clinic-entrance.jpg',
    originalName: 'כניסה לקליניקה',
    description: 'הכניסה הראשית לקליניקה עם שילוט ברור',
    category: 'clinic',
    uploadedAt: '2024-12-24T09:30:00Z',
    isVisible: true,
    size: 4567890,
    mimeType: 'image/jpeg',
    uploadedBy: {
      _id: 'user1',
      username: 'לאה גניש'
    }
  }
];

export const mockActivityData = [
  {
    type: 'page_view',
    page: 'עמוד הבית',
    count: 245,
    time: '10:30',
    change: '+15%',
    timestamp: '2025-01-08T10:30:00Z'
  },
  {
    type: 'article_view',
    page: 'היתרונות של עיסוי שוודי',
    count: 67,
    time: '09:15',
    change: '+8%',
    timestamp: '2025-01-08T09:15:00Z'
  },
  {
    type: 'contact_form',
    page: 'יצירת קשר',
    count: 12,
    time: '14:22',
    change: '+25%',
    timestamp: '2025-01-08T14:22:00Z'
  },
  {
    type: 'health_declaration',
    page: 'הצהרת בריאות',
    count: 8,
    time: '16:45',
    change: '+12%',
    timestamp: '2025-01-08T16:45:00Z'
  },
  {
    type: 'page_view',
    page: 'דף הטיפולים',
    count: 89,
    time: '11:20',
    change: '+5%',
    timestamp: '2025-01-08T11:20:00Z'
  }
];

export const mockTopPages = [
  {
    path: '/',
    title: 'עמוד הבית',
    views: 1245,
    percentage: 35,
    bounceRate: '32%',
    avgTime: '4:23'
  },
  {
    path: '/about',
    title: 'אודות',
    views: 890,
    percentage: 25,
    bounceRate: '28%',
    avgTime: '3:45'
  },
  {
    path: '/services',
    title: 'טיפולים',
    views: 567,
    percentage: 16,
    bounceRate: '25%',
    avgTime: '5:12'
  },
  {
    path: '/articles',
    title: 'מאמרים',
    views: 432,
    percentage: 12,
    bounceRate: '22%',
    avgTime: '6:34'
  },
  {
    path: '/contact',
    title: 'יצירת קשר',
    views: 234,
    percentage: 7,
    bounceRate: '15%',
    avgTime: '2:56'
  },
  {
    path: '/health-declaration',
    title: 'הצהרת בריאות',
    views: 156,
    percentage: 5,
    bounceRate: '8%',
    avgTime: '8:12'
  }
];

export const mockWebsiteStats = {
  today: {
    visits: 156,
    uniqueVisitors: 89,
    avgTime: '3:45',
    bounceRate: '34%',
    pageViews: 423,
    newVisitors: 34
  },
  week: {
    visits: 1250,
    uniqueVisitors: 670,
    avgTime: '4:12',
    bounceRate: '31%',
    pageViews: 3456,
    newVisitors: 245
  },
  month: {
    visits: 5420,
    uniqueVisitors: 2890,
    avgTime: '3:58',
    bounceRate: '35%',
    pageViews: 14567,
    newVisitors: 1123
  }
};

export const mockChartData = {
  visitsByHour: [
    { hour: '00:00', visits: 12 },
    { hour: '01:00', visits: 8 },
    { hour: '02:00', visits: 5 },
    { hour: '03:00', visits: 3 },
    { hour: '04:00', visits: 2 },
    { hour: '05:00', visits: 4 },
    { hour: '06:00', visits: 15 },
    { hour: '07:00', visits: 28 },
    { hour: '08:00', visits: 45 },
    { hour: '09:00', visits: 67 },
    { hour: '10:00', visits: 89 },
    { hour: '11:00', visits: 76 },
    { hour: '12:00', visits: 54 },
    { hour: '13:00', visits: 43 },
    { hour: '14:00', visits: 65 },
    { hour: '15:00', visits: 78 },
    { hour: '16:00', visits: 92 },
    { hour: '17:00', visits: 87 },
    { hour: '18:00', visits: 65 },
    { hour: '19:00', visits: 45 },
    { hour: '20:00', visits: 34 },
    { hour: '21:00', visits: 28 },
    { hour: '22:00', visits: 19 },
    { hour: '23:00', visits: 15 }
  ],
  visitsByDay: [
    { day: 'ראשון', visits: 234, uniqueVisitors: 145 },
    { day: 'שני', visits: 267, uniqueVisitors: 167 },
    { day: 'שלישי', visits: 189, uniqueVisitors: 123 },
    { day: 'רביעי', visits: 298, uniqueVisitors: 189 },
    { day: 'חמישי', visits: 156, uniqueVisitors: 98 },
    { day: 'שישי', visits: 87, uniqueVisitors: 67 },
    { day: 'שבת', visits: 19, uniqueVisitors: 15 }
  ],
  deviceTypes: [
    { device: 'נייד', percentage: 65, count: 1456 },
    { device: 'מחשב', percentage: 28, count: 627 },
    { device: 'טאבלט', percentage: 7, count: 156 }
  ]
};

export const mockQuickActions = [
  {
    id: 'new-article',
    title: 'כתיבת מאמר חדש',
    description: 'הוסף מאמר חדש לאתר',
    icon: 'Plus',
    color: 'primary',
    path: '/admin/articles/new'
  },
  {
    id: 'upload-images',
    title: 'העלאת תמונות',
    description: 'הוסף תמונות לגלריה',
    icon: 'Image',
    color: 'secondary',
    path: '/admin/gallery/upload'
  },
  {
    id: 'export-data',
    title: 'יצוא נתונים',
    description: 'הורד דוח של הצהרות בריאות',
    icon: 'Download',
    color: 'outline',
    action: 'export'
  },
  {
    id: 'view-reports',
    title: 'צפיה בדוחות',
    description: 'סטטיסטיקות מפורטות',
    icon: 'BarChart3',
    color: 'outline',
    path: '/admin/activity'
  }
];

export const mockNotifications = [
  {
    id: '1',
    type: 'health_declaration',
    title: 'הצהרת בריאות חדשה',
    message: 'יהודית כהן שלחה הצהרת בריאות',
    timestamp: '2025-01-08T10:30:00Z',
    read: false,
    priority: 'high'
  },
  {
    id: '2',
    type: 'contact_form',
    title: 'פנייה חדשה',
    message: 'הודעה חדשה בטופס יצירת קשר',
    timestamp: '2025-01-08T09:15:00Z',
    read: false,
    priority: 'medium'
  },
  {
    id: '3',
    type: 'system',
    title: 'גיבוי הושלם',
    message: 'גיבוי אוטומטי הושלם בהצלחה',
    timestamp: '2025-01-08T03:00:00Z',
    read: true,
    priority: 'low'
  },
  {
    id: '4',
    type: 'article',
    title: 'מאמר חדש פורסם',
    message: 'המאמר "טיפול בכאבי גב" פורסם באתר',
    timestamp: '2025-01-07T16:45:00Z',
    read: true,
    priority: 'medium'
  }
];

export const mockSystemInfo = {
  version: '1.0.0',
  lastUpdate: '2025-01-08T12:00:00Z',
  uptime: '15 ימים, 7 שעות',
  diskUsage: {
    used: '2.4 GB',
    total: '10 GB',
    percentage: 24
  },
  databaseSize: '156 MB',
  lastBackup: '2025-01-08T03:00:00Z',
  environment: 'production'
};

// Helper functions for mock data
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const formatDateTime = (dateString) => {
  return new Date(dateString).toLocaleDateString('he-IL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString('he-IL', {
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getHealthConditionLabel = (condition) => {
  const labels = {
    skinDiseases: 'מחלות עור',
    heartDiseases: 'מחלות לב',
    diabetes: 'סוכרת',
    bloodPressure: 'לחץ דם',
    spineProblems: 'בעיות עמוד שדרה',
    fracturesOrSprains: 'שברים או נקעים',
    fluFeverInflammation: 'שפעת/חום/דלקת',
    epilepsy: 'אפילפסיה',
    surgeries: 'ניתוחים',
    chronicMedications: 'תרופות כרוניות',
    pregnancy: 'הריון',
    otherMedicalIssues: 'בעיות רפואיות אחרות'
  };

  return labels[condition] || condition;
};

export const getActivityIcon = (type) => {
  const icons = {
    page_view: 'Eye',
    article_view: 'FileText',
    contact_form: 'Mail',
    health_declaration: 'Heart',
    gallery_view: 'Image',
    download: 'Download'
  };

  return icons[type] || 'Activity';
};

export const getStatusBadgeClass = (status) => {
  const classes = {
    published: 'status-badge--published',
    draft: 'status-badge--draft',
    visible: 'status-badge--visible',
    hidden: 'status-badge--hidden',
    active: 'status-badge--active',
    inactive: 'status-badge--inactive'
  };

  return `status-badge ${classes[status] || ''}`;
};

// Simulation functions for async operations
export const simulateApiCall = (data, delay = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, data });
    }, delay);
  });
};

export const simulateApiError = (message = 'שגיאה בשרת', delay = 1000) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error(message));
    }, delay);
  });
};

// Data generators for pagination
export const generateMockPagination = (items, page = 1, limit = 10) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    items: paginatedItems,
    pagination: {
      page,
      limit,
      total: items.length,
      pages: Math.ceil(items.length / limit),
      hasNext: endIndex < items.length,
      hasPrev: page > 1
    }
  };
};

// Search and filter helpers
export const filterItems = (items, searchTerm, searchFields = ['title', 'name']) => {
  if (!searchTerm) return items;

  const term = searchTerm.toLowerCase();
  return items.filter(item =>
    searchFields.some(field =>
      item[field] && item[field].toLowerCase().includes(term)
    )
  );
};

export const sortItems = (items, sortBy, sortOrder = 'desc') => {
  return [...items].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    // Handle dates
    if (sortBy.includes('At') || sortBy.includes('Date')) {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    // Handle numbers
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }

    // Handle strings and dates
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });
};