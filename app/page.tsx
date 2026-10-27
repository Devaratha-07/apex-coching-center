"use client";
import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  BookOpen,
  PlayCircle,
  Star,
  CheckCircle2,
  FileText,
  Download,
  Play,
  DollarSign,
  Users,
  PlusCircle,
  Upload,
  Trash2,
  Edit,
  Search,
  ShieldCheck,
  CreditCard,
  Smartphone,
  X,
  Menu,
  Award,
  ChevronRight,
  Check,
  BarChart3,
  MessageSquare,
  ArrowRight,
  GraduationCap,
  Clock,
  Flame,
  Send,
  Tag,
  PhoneCall,
  Calendar,
  BookMarked,
  MapPin,
  Timer,
  RefreshCw,
  ClipboardList,
  Layers,
  FileUp,
  CheckCircle,
  HelpCircle,
  Trophy
} from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  answer: number;
  solution: string;
}

interface Lesson {
  id: string;
  subject: string;
  title: string;
  faculty: string;
  duration: string;
  videoUrl: string;
  pdfName: string;
  dppName: string;
  completed: boolean;
  quiz: QuizQuestion[];
}

interface SyllabusUnit {
  unit: string;
  subject: string;
  chapters: string[];
  weightage: string;
}

interface Batch {
  id: string;
  title: string;
  targetClass: string;
  stream: string;
  mode: string;
  timings: string;
  subjects: string[];
  price: number;
  oldPrice: number;
  rating: number;
  enrolledCount: number;
  liveTag: string;
  image: string;
  description: string;
  syllabus: SyllabusUnit[];
  lessons: Lesson[];
}

interface StudyMaterial {
  id: string;
  targetClass: string;
  subject: string;
  category: string;
  title: string;
  downloads: number;
  fileName: string;
  fileDataUrl?: string;
  uploadedAt: string;
}

interface StudentRecord {
  id: string;
  name: string;
  studentClass: string;
  board: string;
  batch: string;
  attendance: number;
  feeAmount: number;
  feeStatus: 'Paid' | 'Pending';
  parentPhone: string;
  joinedDate: string;
}

interface EnquiryLead {
  id: string;
  studentName: string;
  targetClass: string;
  board: string;
  mode: string;
  phone: string;
  date: string;
  status: 'Pending Call' | 'Demo Scheduled' | 'Enrolled';
}

interface DoubtItem {
  id: string;
  student: string;
  question: string;
  reply: string;
  time: string;
}

interface TestAttempt {
  id: string;
  batchTitle: string;
  lessonTitle: string;
  score: number;
  total: number;
  percentage: number;
  date: string;
}

const INITIAL_BATCHES: Batch[] = [
  {
    id: 'batch-10-aarambh',
    title: 'Aarambh Batch: Class 10th Complete Boards + Foundation',
    targetClass: 'Class 10th',
    stream: 'Foundation (Maths + Science + SST + Eng)',
    mode: 'Offline + Online Hybrid',
    timings: '4:00 PM - 6:30 PM (Mon-Sat)',
    subjects: ['Maths', 'Science', 'SST', 'English'],
    price: 3499,
    oldPrice: 6000,
    rating: 4.9,
    enrolledCount: 1540,
    liveTag: '10th BOARDS SPECIAL',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    description: 'Complete NCERT line-by-line coverage, Chapter-wise 10-Year Board PYQs, Competency Questions & Weekly Tests.',
    syllabus: [
      { unit: 'Unit 1: Algebra & Trigonometry', subject: 'Maths', chapters: ['Real Numbers & Polynomials', 'Pair of Linear Equations', 'Quadratic Equations & AP', 'Trigonometric Identities'], weightage: '32 Marks' },
      { unit: 'Unit 2: Physics & Chemistry', subject: 'Science', chapters: ['Chemical Reactions & Equations', 'Acids, Bases & Salts', 'Light Reflection & Refraction', 'Electricity & Magnetism'], weightage: '55 Marks' },
      { unit: 'Unit 3: Biology & SST', subject: 'SST & Bio', chapters: ['Life Processes', 'Control & Coordination', 'Nationalism in India', 'Globalisation & Economy'], weightage: '45 Marks' }
    ],
    lessons: [
      {
        id: 'l-10-1',
        subject: 'Maths',
        title: 'Ch 8: Introduction to Trigonometry - Identities & Board PYQs',
        faculty: 'Er. Rajesh Verma (IIT Roorkee)',
        duration: '54:20',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        pdfName: 'Class10_Maths_Trigonometry_Notes.pdf',
        dppName: 'DPP_08_Trigonometry.pdf',
        completed: true,
        quiz: [
          { id: 'q-101', question: 'If sin θ = 3/5, then the value of cos θ is:', options: ['4/5', '3/4', '5/4', '1/5'], answer: 0, solution: 'By identity: cos θ = √(1 - sin²θ) = 4/5.' },
          { id: 'q-102', question: 'Value of (sec² 45° - tan² 45°)?', options: ['0', '1', '2', '√2'], answer: 1, solution: 'Standard trigonometric identity is equal to 1.' }
        ]
      }
    ]
  },
  {
    id: 'batch-12-lakshya-sci',
    title: 'Lakshya Batch: Class 12th Science (PCM / PCB) + JEE / NEET',
    targetClass: 'Class 12th Science',
    stream: 'Science (PCM / PCB + Entrance)',
    mode: 'Offline Classroom + Live App',
    timings: '3:30 PM - 7:00 PM (Mon-Sat)',
    subjects: ['Physics', 'Chemistry', 'Maths', 'Biology'],
    price: 4999,
    oldPrice: 8500,
    rating: 5.0,
    enrolledCount: 2280,
    liveTag: '12th BOARDS + JEE/NEET',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    description: 'Covers all 5-mark Physics derivations, Organic Chemistry named reactions, and Calculus with 10-Year PYQs.',
    syllabus: [
      { unit: 'Physics: Electrostatics & Optics', subject: 'Physics', chapters: ['Electric Charges, Fields & Gauss Law', 'Current Electricity', 'Ray Optics & Wave Optics'], weightage: '70 Marks' },
      { unit: 'Chemistry: Physical & Organic', subject: 'Chemistry', chapters: ['Solutions & Electrochemistry', 'Coordination Compounds', 'Aldehydes, Ketones & Amines'], weightage: '70 Marks' },
      { unit: 'Mathematics: Calculus & Vectors', subject: 'Maths', chapters: ['Matrices & Determinants', 'Continuity & Differentiability', 'Integrals & Differential Equations'], weightage: '80 Marks' }
    ],
    lessons: [
      {
        id: 'l-12-1',
        subject: 'Physics',
        title: 'Ch 1: Electric Charges & Fields - Gauss Law & All Board Derivations',
        faculty: 'Er. Saurabh Mishra (IIT Kanpur)',
        duration: '66:40',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        pdfName: 'Class12_Physics_Electrostatics.pdf',
        dppName: 'DPP_01_Gauss.pdf',
        completed: true,
        quiz: [
          { id: 'q-121', question: 'According to Gauss Law, total electric flux through a closed surface enclosing charge q is:', options: ['q · ε0', 'q / ε0', '2q / ε0', 'Zero'], answer: 1, solution: 'Net electric flux Φ = q_enclosed / ε0.' }
        ]
      }
    ]
  },
  {
    id: 'batch-12-kautilya-com',
    title: 'Kautilya Batch: Class 12th Commerce (Accounts + Eco + BST + CUET)',
    targetClass: 'Class 12th Commerce',
    stream: 'Commerce (Boards + CUET)',
    mode: 'Offline + Live App Access',
    timings: '4:30 PM - 7:00 PM (Mon-Sat)',
    subjects: ['Accountancy', 'Economics', 'Business Studies'],
    price: 3999,
    oldPrice: 7000,
    rating: 4.9,
    enrolledCount: 940,
    liveTag: '12th COMMERCE + SRCC TARGET',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    description: 'Master Partnership Accounts, Company Balance Sheets, Cash Flow Statements, and Macroeconomics with CA Faculty.',
    syllabus: [
      { unit: 'Accountancy: Partnership & Company', subject: 'Accounts', chapters: ['Partnership Fundamentals & Goodwill', 'Admission & Retirement of Partner', 'Share Capital & Cash Flow Statement'], weightage: '80 Marks' },
      { unit: 'Economics: Macro & Indian Eco', subject: 'Economics', chapters: ['National Income & Aggregates', 'Money, Banking & Government Budget', 'Balance of Payments & Reforms'], weightage: '80 Marks' }
    ],
    lessons: [
      {
        id: 'l-12-c1',
        subject: 'Accountancy',
        title: 'Ch 2: Accounting for Partnership - Fundamentals & Past Adjustments',
        faculty: 'CA Sidharth Bansal (AIR-18)',
        duration: '62:30',
        videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        pdfName: 'Class12_Accounts_Partnership.pdf',
        dppName: 'DPP_Partnership.pdf',
        completed: false,
        quiz: [
          { id: 'q-12c1', question: 'In the absence of a Partnership Deed, interest on partner loan is allowed at:', options: ['10% p.a.', '6% p.a.', '12% p.a.', 'No interest'], answer: 1, solution: 'As per Indian Partnership Act 1932, it is 6% p.a.' }
        ]
      }
    ]
  }
];

const INITIAL_STUDY_MATERIALS: StudyMaterial[] = [
  { id: 'sm-1', targetClass: 'Class 10th', subject: 'Maths & Science', category: 'Sample Papers', title: 'CBSE Class 10th Maths & Science Latest Sample Paper PDF', downloads: 4820, fileName: 'Class10_Sample_Papers.pdf', uploadedAt: '10 Oct 2026' },
  { id: 'sm-2', targetClass: 'Class 10th', subject: 'All Subjects', category: 'Formula Sheet', title: 'Class 10th All Chapters Maths Formulas & Reactions Chart', downloads: 6150, fileName: 'Class10_Formulas.pdf', uploadedAt: '12 Oct 2026' },
  { id: 'sm-3', targetClass: 'Class 12th Science', subject: 'Physics', category: 'Derivations', title: 'Class 12th Physics All 5-Mark Board Derivations PDF', downloads: 7390, fileName: 'Class12_Physics_Derivations.pdf', uploadedAt: '15 Oct 2026' },
  { id: 'sm-4', targetClass: 'Class 12th Commerce', subject: 'Accountancy', category: 'PYQ Bank', title: 'Class 12th Accountancy Partnership Top 50 Board Questions', downloads: 3290, fileName: 'Class12_Accounts_Bank.pdf', uploadedAt: '18 Oct 2026' }
];

const INITIAL_STUDENT_RECORDS: StudentRecord[] = [
  { id: 'STU-101', name: 'Aryan Sharma', studentClass: 'Class 12th Science', board: 'CBSE Board', batch: 'Lakshya Batch', attendance: 94, feeAmount: 4499, feeStatus: 'Paid', parentPhone: '9876543210', joinedDate: '01 Sep 2026' },
  { id: 'STU-102', name: 'Sneha Verma', studentClass: 'Class 10th', board: 'CBSE Board', batch: 'Aarambh Batch', attendance: 91, feeAmount: 2999, feeStatus: 'Paid', parentPhone: '9811223344', joinedDate: '05 Sep 2026' },
  { id: 'STU-103', name: 'Rohit Deshmukh', studentClass: 'Class 12th Commerce', board: 'ICSE Board', batch: 'Kautilya Batch', attendance: 82, feeAmount: 3999, feeStatus: 'Pending', parentPhone: '9765432109', joinedDate: '12 Sep 2026' }
];

const INITIAL_ENQUIRIES: EnquiryLead[] = [
  { id: 'ENQ-201', studentName: 'Kunal Singhania', targetClass: 'Class 12th Science', board: 'CBSE Board', mode: 'Offline + Online Hybrid', phone: '9812345670', date: 'Today, 10:30 AM', status: 'Pending Call' },
  { id: 'ENQ-202', studentName: 'Ananya Gupta', targetClass: 'Class 10th', board: 'ICSE Board', mode: 'Online Live Batch', phone: '9871122334', date: 'Yesterday', status: 'Demo Scheduled' }
];

const BOARD_TOPPERS = [
  { name: 'Aaditya Narayan', exam: 'Class 12th Science (CBSE)', score: '98.8%', subHighlight: 'Physics: 100/100 | Maths: 99/100', batch: 'Lakshya Science', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80', quote: 'Takshashila Academy’s derivation booklet and weekly tests helped me score 100/100 in Physics!' },
  { name: 'Riya Chaturvedi', exam: 'Class 10th District Topper', score: '99.2%', subHighlight: 'Maths: 100/100 | Science: 100/100', batch: 'Aarambh 10th', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80', quote: 'Every NCERT line and past 10 years board PYQ was covered in class with DPPs.' },
  { name: 'Harshvardhan Jain', exam: 'Class 12th Commerce + CUET', score: '98.4%', subHighlight: 'Accountancy: 100/100 | SRCC Selected', batch: 'Kautilya Commerce', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80', quote: 'CA Sidharth Sir’s format tricks for Partnership saved me 25 minutes in Boards.' }
];

const loadStorage = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
};

export default function App() {
  const [activeView, setActiveView] = useState<'landing' | 'student' | 'admin'>('landing');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [showAdminLoginModal, setShowAdminLoginModal] = useState(false);

  const [batches, setBatches] = useState<Batch[]>(() => loadStorage('takshashila_batches_v1', INITIAL_BATCHES));
  const [studyMaterials, setStudyMaterials] = useState<StudyMaterial[]>(() => loadStorage('takshashila_materials_v1', INITIAL_STUDY_MATERIALS));
  const [enrolledBatchIds, setEnrolledBatchIds] = useState<string[]>(() => loadStorage('takshashila_enrolled_v1', ['batch-12-lakshya-sci', 'batch-10-aarambh']));
  const [studentRecords, setStudentRecords] = useState<StudentRecord[]>(() => loadStorage('takshashila_students_v1', INITIAL_STUDENT_RECORDS));
  const [enquiries, setEnquiries] = useState<EnquiryLead[]>(() => loadStorage('takshashila_enquiries_v1', INITIAL_ENQUIRIES));
  const [testHistory, setTestHistory] = useState<TestAttempt[]>(() => loadStorage('takshashila_testhistory_v1', []));
  const [doubtsList, setDoubtsList] = useState<DoubtItem[]>(() => loadStorage('takshashila_doubts_v1', [
    { id: 'd-1', student: 'Aryan Sharma (Class 12th)', question: 'Is it compulsory to draw the Gaussian surface diagram for the 3-mark derivation in Physics?', reply: 'Er. Saurabh Mishra (HOD Physics): Yes Aryan! 1 full mark is allotted strictly for a labeled Gaussian surface diagram.', time: '15 mins ago' }
  ]));

  useEffect(() => { try { localStorage.setItem('takshashila_batches_v1', JSON.stringify(batches)); } catch (e) {} }, [batches]);
  useEffect(() => { try { localStorage.setItem('takshashila_materials_v1', JSON.stringify(studyMaterials)); } catch (e) {} }, [studyMaterials]);
  useEffect(() => { try { localStorage.setItem('takshashila_enrolled_v1', JSON.stringify(enrolledBatchIds)); } catch (e) {} }, [enrolledBatchIds]);
  useEffect(() => { try { localStorage.setItem('takshashila_students_v1', JSON.stringify(studentRecords)); } catch (e) {} }, [studentRecords]);
  useEffect(() => { try { localStorage.setItem('takshashila_enquiries_v1', JSON.stringify(enquiries)); } catch (e) {} }, [enquiries]);
  useEffect(() => { try { localStorage.setItem('takshashila_testhistory_v1', JSON.stringify(testHistory)); } catch (e) {} }, [testHistory]);
  useEffect(() => { try { localStorage.setItem('takshashila_doubts_v1', JSON.stringify(doubtsList)); } catch (e) {} }, [doubtsList]);

  const [selectedClassFilter, setSelectedClassFilter] = useState('All');
  const [activeSyllabusTab, setActiveSyllabusTab] = useState('Class 10th');
  const [searchQuery, setSearchQuery] = useState('');
  const [countdown, setCountdown] = useState({ days: 112, hours: 14, mins: 38, secs: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 };
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1, secs: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        return { ...prev, days: Math.max(prev.days - 1, 1), hours: 23, mins: 59, secs: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [activeBatchId, setActiveBatchId] = useState('batch-12-lakshya-sci');
  const [activeLessonId, setActiveLessonId] = useState('l-12-1');
  const [selectedSubjectTab, setSelectedSubjectTab] = useState('All');
  const [playbackSpeed, setPlaybackSpeed] = useState('1x');
  const [doubtInput, setDoubtInput] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

  const [showQuizModal, setShowQuizModal] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizTimeLeft, setQuizTimeLeft] = useState(180);

  useEffect(() => {
    if (!showQuizModal || quizSubmitted) return;
    const interval = setInterval(() => {
      setQuizTimeLeft((prev) => {
        if (prev <= 1) {
          setQuizSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showQuizModal, quizSubmitted]);

  const [enquiryForm, setEnquiryForm] = useState({ studentName: '', targetClass: 'Class 10th', board: 'CBSE Board', mode: 'Offline + Online Hybrid', phone: '' });

  const [adminTab, setAdminTab] = useState<'batches' | 'pdfs' | 'mocktests' | 'students' | 'enquiries'>('batches');
  const [studentSearch, setStudentSearch] = useState('');
  const [studentStatusFilter, setStudentStatusFilter] = useState('All');
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);
  const [batchForm, setBatchForm] = useState({ title: '', targetClass: 'Class 12th Science', stream: 'Science (PCM / PCB)', mode: 'Offline + Online Hybrid', timings: '4:00 PM - 6:30 PM', price: 4499, description: '', lectureSubject: 'Physics', lectureTitle: '', lectureDuration: '55:00' });

  const [pdfUploadForm, setPdfUploadForm] = useState({ title: '', targetClass: 'Class 10th', subject: 'Maths', category: 'Handwritten Notes', fileName: '', fileDataUrl: '' });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [mcqForm, setMcqForm] = useState({ batchId: 'batch-10-aarambh', question: '', optionA: '', optionB: '', optionC: '', optionD: '', correctOption: 0, solution: '' });

  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [demoVideoSelection, setDemoVideoSelection] = useState(0);
  const [showDemoBookModal, setShowDemoBookModal] = useState(false);
  const [checkoutBatch, setCheckoutBatch] = useState<Batch | null>(null);
  const [couponCode, setCouponCode] = useState('BOARD95');
  const [couponApplied, setCouponApplied] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const [toast, setToast] = useState<{ message: string } | null>(null);
  const triggerToast = (message: string) => { setToast({ message }); setTimeout(() => setToast(null), 4000); };

  const classOptions = ['All', 'Class 10th', 'Class 12th Science', 'Class 12th Commerce'];

  const filteredBatches = useMemo(() => {
    return batches.filter((b) => {
      const matchesClass = selectedClassFilter === 'All' || b.targetClass === selectedClassFilter;
      const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || b.stream.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesClass && matchesSearch;
    });
  }, [batches, selectedClassFilter, searchQuery]);

  const activeBatch = useMemo(() => batches.find((b) => b.id === activeBatchId) || batches[0], [batches, activeBatchId]);
  const filteredBatchLessons = useMemo(() => { if (!activeBatch) return []; if (selectedSubjectTab === 'All') return activeBatch.lessons; return activeBatch.lessons.filter((l) => l.subject === selectedSubjectTab); }, [activeBatch, selectedSubjectTab]);
  const activeLesson = useMemo(() => activeBatch?.lessons.find((l) => l.id === activeLessonId) || activeBatch?.lessons[0], [activeBatch, activeLessonId]);
  const activeSyllabusBatch = useMemo(() => batches.find((b) => b.targetClass === activeSyllabusTab) || batches[0], [batches, activeSyllabusTab]);

  const filteredStudentRecords = useMemo(() => {
    return studentRecords.filter((stu) => {
      const matchesStatus = studentStatusFilter === 'All' || stu.feeStatus === studentStatusFilter;
      const matchesSearch = stu.name.toLowerCase().includes(studentSearch.toLowerCase()) || stu.batch.toLowerCase().includes(studentSearch.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [studentRecords, studentStatusFilter, studentSearch]);

  const totalFeeCollection = useMemo(() => { const paid = studentRecords.filter((s) => s.feeStatus === 'Paid').reduce((acc, s) => acc + Number(s.feeAmount), 0); return paid + 1250000; }, [studentRecords]);
  const totalEnrolledStudents = useMemo(() => batches.reduce((acc, b) => acc + b.enrolledCount, 0), [batches]);
  const pendingEnquiriesCount = useMemo(() => enquiries.filter((e) => e.status === 'Pending Call').length, [enquiries]);

  const handleNavbarClassSelect = (cls: string) => { setSelectedClassFilter(cls); setActiveView('landing'); setTimeout(() => { const el = document.getElementById('batches-explorer'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }, 100); };
  const handlePlaybackSpeedChange = (spd: string) => { setPlaybackSpeed(spd); const numericRate = parseFloat(spd.replace('x', '')); if (videoRef.current && !isNaN(numericRate)) videoRef.current.playbackRate = numericRate; triggerToast(`Playback speed set to ${spd}`); };

  const handleEnrollClick = (batch: Batch) => {
    if (enrolledBatchIds.includes(batch.id)) {
      setActiveBatchId(batch.id);
      setActiveLessonId(batch.lessons[0]?.id || '');
      setSelectedSubjectTab('All');
      setActiveView('student');
      triggerToast(`Opened Classroom: ${batch.title}`);
      return;
    }
    setCheckoutBatch(batch);
    setCouponCode('BOARD95');
    setCouponApplied(true);
  };

  const handleCompletePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkoutBatch) return;
    setIsProcessingPayment(true);
    const finalFee = couponApplied ? Math.max(checkoutBatch.price - 500, 999) : checkoutBatch.price;
    setTimeout(() => {
      setIsProcessingPayment(false);
      if (!enrolledBatchIds.includes(checkoutBatch.id)) setEnrolledBatchIds((prev) => [...prev, checkoutBatch.id]);
      setBatches((prev) => prev.map((b) => (b.id === checkoutBatch.id ? { ...b, enrolledCount: b.enrolledCount + 1 } : b)));
      setStudentRecords((prev) => [{ id: `STU-${Math.floor(200 + Math.random() * 799)}`, name: 'New Enrolled Student', studentClass: checkoutBatch.targetClass, board: 'CBSE Board', batch: checkoutBatch.title.split(':')[0], attendance: 100, feeAmount: finalFee, feeStatus: 'Paid', parentPhone: '9876500112', joinedDate: 'Today' }, ...prev]);
      setCheckoutBatch(null);
      setActiveBatchId(checkoutBatch.id);
      setActiveLessonId(checkoutBatch.lessons[0]?.id || '');
      setActiveView('student');
      triggerToast('Payment Successful! Batch unlocked in Student Portal.');
    }, 700);
  };

  const handleSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enquiryForm.studentName.trim() || !enquiryForm.phone.trim()) return;
    const matchedBatch = batches.find((b) => b.targetClass === enquiryForm.targetClass) || batches[0];
    const newLead: EnquiryLead = { id: `ENQ-${Math.floor(300 + Math.random() * 699)}`, studentName: enquiryForm.studentName, targetClass: enquiryForm.targetClass, board: enquiryForm.board, mode: enquiryForm.mode, phone: enquiryForm.phone, date: 'Just Now', status: 'Pending Call' };
    setEnquiries((prev) => [newLead, ...prev]);
    const newStu: StudentRecord = { id: `STU-${Math.floor(300 + Math.random() * 699)}`, name: enquiryForm.studentName, studentClass: enquiryForm.targetClass, board: enquiryForm.board, batch: matchedBatch.title.split(':')[0], attendance: 100, feeAmount: matchedBatch.price, feeStatus: 'Pending', parentPhone: enquiryForm.phone, joinedDate: 'Just Now' };
    setStudentRecords((prev) => [newStu, ...prev]);
    setEnquiryForm({ studentName: '', targetClass: 'Class 10th', board: 'CBSE Board', mode: 'Offline + Online Hybrid', phone: '' });
    setShowDemoBookModal(false);
    triggerToast('Student Registered! Added to Takshashila Admin Database.');
  };

  const toggleLessonComplete = (lessonId: string) => {
    if (!activeBatch) return;
    setBatches((prev) => prev.map((batch) => { if (batch.id !== activeBatch.id) return batch; return { ...batch, lessons: batch.lessons.map((l) => (l.id === lessonId ? { ...l, completed: !l.completed } : l)) }; }));
    triggerToast('Lecture progress updated!');
  };

  const handleDownloadMaterial = (mat: StudyMaterial) => {
    setStudyMaterials((prev) => prev.map((m) => (m.id === mat.id ? { ...m, downloads: m.downloads + 1 } : m)));
    if (mat.fileDataUrl) {
      const a = document.createElement('a'); a.href = mat.fileDataUrl; a.download = mat.fileName || `${mat.title}.pdf`; document.body.appendChild(a); a.click(); document.body.removeChild(a);
      triggerToast(`Downloaded PDF: ${mat.fileName}`); return;
    }
    handleDownloadGeneratedFile(mat.fileName, mat.title);
  };

  const handleDownloadGeneratedFile = (fileName: string, label: string) => {
    const text = `========================================================\nTAKSHASHILA ACADEMY (CLASS 10th & 12th COACHING)\n========================================================\nDocument: ${label}\nFile: ${fileName}\n\n1. Revise NCERT line by line.\n2. Practice all board PYQs and derivations.\nHelpline: +91 98765-43210\n========================================================`;
    const blob = new Blob([text], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = fileName; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    triggerToast(`Downloaded: ${fileName}`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    if (file.size > 4 * 1024 * 1024) { triggerToast('File size must be under 4MB.'); return; }
    const reader = new FileReader();
    reader.onload = () => { setPdfUploadForm((prev) => ({ ...prev, fileName: file.name, fileDataUrl: reader.result as string, title: prev.title || file.name.replace('.pdf', '') })); triggerToast(`Selected PDF: ${file.name}`); };
    reader.readAsDataURL(file);
  };

  const handleAdminUploadPdf = (e: React.FormEvent) => {
    e.preventDefault(); if (!pdfUploadForm.title.trim()) return;
    const newMat: StudyMaterial = { id: `sm-${Date.now()}`, targetClass: pdfUploadForm.targetClass, subject: pdfUploadForm.subject, category: pdfUploadForm.category, title: pdfUploadForm.title, downloads: 1, fileName: pdfUploadForm.fileName || `${pdfUploadForm.title.replace(/\s+/g, '_')}.pdf`, fileDataUrl: pdfUploadForm.fileDataUrl || undefined, uploadedAt: 'Just Now' };
    setStudyMaterials((prev) => [newMat, ...prev]);
    setPdfUploadForm({ title: '', targetClass: 'Class 10th', subject: 'Maths', category: 'Handwritten Notes', fileName: '', fileDataUrl: '' });
    if (fileInputRef.current) fileInputRef.current.value = '';
    triggerToast('PDF Uploaded Successfully! Live in Student Portal.');
  };

  const handleDeleteMaterial = (id: string) => { setStudyMaterials((prev) => prev.filter((m) => m.id !== id)); triggerToast('Material removed.'); };

  const handleAddMockQuestion = (e: React.FormEvent) => {
    e.preventDefault(); if (!mcqForm.question.trim()) return;
    const newQ: QuizQuestion = { id: `q-${Date.now()}`, question: mcqForm.question, options: [mcqForm.optionA, mcqForm.optionB, mcqForm.optionC || 'None', mcqForm.optionD || 'All'], answer: Number(mcqForm.correctOption), solution: mcqForm.solution || 'Refer to NCERT notes.' };
    setBatches((prev) => prev.map((b) => { if (b.id !== mcqForm.batchId) return b; const updated = b.lessons.map((l, idx) => idx === 0 ? { ...l, quiz: [...l.quiz, newQ] } : l); return { ...b, lessons: updated }; }));
    setMcqForm((prev) => ({ ...prev, question: '', optionA: '', optionB: '', optionC: '', optionD: '', solution: '' }));
    triggerToast('MCQ added to Mock Test engine!');
  };

  const handlePostDoubt = (e: React.FormEvent) => {
    e.preventDefault(); if (!doubtInput.trim()) return;
    const item: DoubtItem = { id: `d-${Date.now()}`, student: 'Aryan Sharma (Student Portal)', question: doubtInput, reply: `${activeLesson?.faculty || 'Faculty'}: Great question! Check page 3 of the uploaded notes.`, time: 'Just now' };
    setDoubtsList((prev) => [item, ...prev]); setDoubtInput(''); triggerToast('Doubt posted successfully!');
  };

  const toggleStudentFee = (id: string) => { setStudentRecords((prev) => prev.map((s) => (s.id === id ? { ...s, feeStatus: s.feeStatus === 'Paid' ? 'Pending' : 'Paid' } : s))); triggerToast('Fee status updated.'); };
  const cycleEnquiry = (id: string) => { const states: Array<'Pending Call' | 'Demo Scheduled' | 'Enrolled'> = ['Pending Call', 'Demo Scheduled', 'Enrolled']; setEnquiries((prev) => prev.map((e) => { if (e.id !== id) return e; const next = (states.indexOf(e.status) + 1) % states.length; return { ...e, status: states[next] }; })); triggerToast('Lead status updated.'); };

  const openAddBatch = () => { setEditingBatch(null); setBatchForm({ title: '', targetClass: 'Class 12th Science', stream: 'Science (PCM / PCB)', mode: 'Offline + Online Hybrid', timings: '4:00 PM - 6:30 PM', price: 4499, description: '', lectureSubject: 'Physics', lectureTitle: '', lectureDuration: '55:00' }); setShowBatchModal(true); };
  const openEditBatch = (b: Batch) => { setEditingBatch(b); setBatchForm({ title: b.title, targetClass: b.targetClass, stream: b.stream, mode: b.mode, timings: b.timings, price: b.price, description: b.description, lectureSubject: b.subjects[0] || 'Physics', lectureTitle: '', lectureDuration: '50:00' }); setShowBatchModal(true); };

  const handleSaveBatch = (e: React.FormEvent) => {
    e.preventDefault(); if (!batchForm.title.trim()) return;
    if (editingBatch) {
      setBatches((prev) => prev.map((b) => {
        if (b.id !== editingBatch.id) return b;
        const lessons = [...b.lessons];
        if (batchForm.lectureTitle.trim()) {
          lessons.push({ id: `l-${Date.now()}`, subject: batchForm.lectureSubject, title: batchForm.lectureTitle, faculty: 'Er. Saurabh Mishra', duration: batchForm.lectureDuration, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', pdfName: 'Notes.pdf', dppName: 'DPP.pdf', completed: false, quiz: [{ id: `q-${Date.now()}`, question: 'Sample board question:', options: ['A', 'B', 'C', 'D'], answer: 0, solution: 'NCERT derivation.' }] });
        }
        return { ...b, title: batchForm.title, targetClass: batchForm.targetClass, stream: batchForm.stream, mode: batchForm.mode, timings: batchForm.timings, price: Number(batchForm.price), description: batchForm.description, lessons };
      }));
      triggerToast('Batch updated!');
    } else {
      const nb: Batch = { id: `batch-${Date.now()}`, title: batchForm.title, targetClass: batchForm.targetClass, stream: batchForm.stream, mode: batchForm.mode, timings: batchForm.timings, subjects: ['Physics', 'Chemistry', 'Maths'], price: Number(batchForm.price) || 3999, oldPrice: 7999, rating: 5.0, enrolledCount: 1, liveTag: 'NEW BATCH', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80', description: batchForm.description || 'Complete offline & online coaching.', syllabus: [{ unit: 'Unit 1: Core Syllabus', subject: batchForm.lectureSubject, chapters: ['Chapter 1: Concepts', 'Chapter 2: Board PYQs'], weightage: '40 Marks' }], lessons: [{ id: `l-${Date.now()}`, subject: batchForm.lectureSubject, title: batchForm.lectureTitle || 'Ch 1: Introduction & Blueprint', faculty: 'Er. Saurabh Mishra', duration: batchForm.lectureDuration, videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', pdfName: 'Notes.pdf', dppName: 'DPP.pdf', completed: false, quiz: [{ id: `q-${Date.now()}`, question: 'Primary book for preparation?', options: ['NCERT + PYQs', 'Magazines', 'None', 'Guides'], answer: 0, solution: 'NCERT is mandatory.' }] }] };
      setBatches((prev) => [nb, ...prev]); setEnrolledBatchIds((prev) => [...prev, nb.id]); triggerToast('Batch created and unlocked!');
    }
    setShowBatchModal(false);
  };

  const deleteBatch = (id: string) => { if (batches.length <= 1) { triggerToast('At least one batch must remain.'); return; } setBatches((prev) => prev.filter((b) => b.id !== id)); triggerToast('Batch deleted.'); };

  const completedCount = activeBatch?.lessons.filter((l) => l.completed).length || 0;
  const totalCount = activeBatch?.lessons.length || 1;
  const progressPct = Math.round((completedCount / totalCount) * 100);
  const currentQuiz = activeLesson?.quiz || [];
  const quizScore = currentQuiz.reduce((acc, q, idx) => acc + (quizAnswers[idx] === q.answer ? 1 : 0), 0);

  const handleSubmitMockTest = () => {
    setQuizSubmitted(true);
    if (activeLesson && !activeLesson.completed) toggleLessonComplete(activeLesson.id);
    const pct = currentQuiz.length > 0 ? Math.round((quizScore / currentQuiz.length) * 100) : 100;
    const attempt: TestAttempt = { id: `att-${Date.now()}`, batchTitle: activeBatch?.title.split(':')[0] || 'Batch', lessonTitle: activeLesson?.title || 'Mock Test', score: quizScore, total: currentQuiz.length, percentage: pct, date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setTestHistory((prev) => [attempt, ...prev]);
    triggerToast(`Test Submitted! Score: ${quizScore}/${currentQuiz.length} (${pct}%)`);
  };

  const formatTimer = (secs: number) => { const m = Math.floor(secs / 60); const s = secs % 60; return `${m}:${s < 10 ? '0' : ''}${s}`; };

  const DEMO_LECTURES = [
    { title: 'Class 12th Physics: Gauss Law & Board Derivations', faculty: 'Er. Saurabh Mishra (IIT Kanpur)', targetClass: 'Class 12th Science', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
    { title: 'Class 10th Maths: Trigonometry Identities & Board PYQs', faculty: 'Er. Rajesh Verma (IIT Roorkee)', targetClass: 'Class 10th', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
    { title: 'Class 12th Accountancy: Partnership Fundamentals', faculty: 'CA Sidharth Bansal (AIR-18)', targetClass: 'Class 12th Commerce', videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans overflow-x-hidden selection:bg-amber-500 selection:text-slate-950">
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 bg-slate-900 text-white px-4 py-3.5 rounded-xl shadow-2xl border-2 border-amber-500 max-w-sm">
          <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
          <span className="text-xs sm:text-sm font-bold">{toast.message}</span>
          <button onClick={() => setToast(null)} className="text-slate-400 hover:text-white"><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Top Strip Banner */}
      <div className="bg-slate-950 text-slate-100 text-xs py-2 px-4 border-b border-amber-500/30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-amber-500 text-slate-950 px-2.5 py-0.5 rounded font-extrabold uppercase tracking-wider text-[11px]">
              <Flame className="w-3.5 h-3.5 fill-slate-950" /> Takshashila Academy 2026-27
            </span>
            <span className="hidden md:inline text-slate-300 font-medium">
              Class 10th & 12th Board & Competitive • Use Coupon <strong className="text-amber-400">BOARD95</strong> for ₹500 Off!
            </span>
          </div>
          <div className="flex items-center gap-3 ml-auto">
            <span className="hidden sm:inline-flex items-center gap-1 text-amber-400 font-bold"><MapPin className="w-3.5 h-3.5" /> Offline Center & Live LMS</span>
            <button onClick={() => { localStorage.clear(); window.location.reload(); }} className="text-[11px] text-slate-400 hover:text-amber-400 flex items-center gap-1"><RefreshCw className="w-3 h-3" /> Reset Data</button>
          </div>
        </div>
      </div>

      {/* Sticky Responsive Header */}
      <header className="sticky top-0 z-40 bg-slate-900 text-white border-b-2 border-amber-500/80 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
          <button onClick={() => setActiveView('landing')} className="flex items-center gap-2.5 text-left shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 flex items-center justify-center shadow-md font-extrabold text-xl">
              T
            </div>
            <div>
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white block leading-none">
                Takshashila<span className="text-amber-400">Academy</span>
              </span>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 block mt-0.5">
                Coaching Institute
              </span>
            </div>
          </button>

          <div className="hidden xl:flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-xl border border-slate-800">
            {['Class 10th', 'Class 12th Science', 'Class 12th Commerce'].map((cls) => (
              <button key={cls} onClick={() => handleNavbarClassSelect(cls)} className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold transition ${selectedClassFilter === cls && activeView === 'landing' ? 'bg-amber-500 text-slate-950' : 'text-slate-300 hover:text-amber-400'}`}>
                {cls}
              </button>
            ))}
          </div>

          <nav className="hidden md:flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button onClick={() => setActiveView('landing')} className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition ${activeView === 'landing' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white'}`}>Public Website</button>
            <button onClick={() => setActiveView('student')} className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 ${activeView === 'student' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white'}`}>
              <PlayCircle className="w-3.5 h-3.5" /> Student Portal <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-extrabold ${activeView === 'student' ? 'bg-slate-950 text-amber-400' : 'bg-amber-500/20 text-amber-400'}`}>{enrolledBatchIds.length}</span>
            </button>
            {/* 🔒 PROTECTED ADMIN BUTTON */}
            <button 
              onClick={() => {
                if (isAdminLoggedIn) {
                  setActiveView('admin');
                } else {
                  setShowAdminLoginModal(true);
                }
              }} 
              className={`px-3.5 py-1.5 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 ${activeView === 'admin' ? 'bg-amber-500 text-slate-950 shadow' : 'text-slate-300 hover:text-white'}`}
            >
              <BarChart3 className="w-3.5 h-3.5" /> Admin Panel {pendingEnquiriesCount > 0 && <span className="bg-rose-500 text-white text-[10px] px-1.5 rounded-full font-extrabold">{pendingEnquiriesCount}</span>}
            </button>
          </nav>

          <div className="hidden sm:flex items-center gap-2">
            <button onClick={() => setShowDemoBookModal(true)} className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold px-4 py-2.5 rounded-xl shadow-md transition flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Book Free Demo
            </button>
          </div>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 rounded-lg text-slate-200 hover:bg-slate-800">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-5 space-y-3">
            <div className="grid grid-cols-3 gap-1.5 bg-slate-900 p-1.5 rounded-xl">
              <button onClick={() => { setActiveView('landing'); setMobileMenuOpen(false); }} className={`py-2 rounded-lg text-xs font-extrabold ${activeView === 'landing' ? 'bg-amber-500 text-slate-950' : 'text-slate-300'}`}>Website</button>
              <button onClick={() => { setActiveView('student'); setMobileMenuOpen(false); }} className={`py-2 rounded-lg text-xs font-extrabold ${activeView === 'student' ? 'bg-amber-500 text-slate-950' : 'text-slate-300'}`}>Student</button>
              <button onClick={() => { 
                if (isAdminLoggedIn) {
                  setActiveView('admin');
                } else {
                  setShowAdminLoginModal(true);
                }
                setMobileMenuOpen(false); 
              }} className={`py-2 rounded-lg text-xs font-extrabold ${activeView === 'admin' ? 'bg-amber-500 text-slate-950' : 'text-slate-300'}`}>Admin</button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {classOptions.map((cls) => (<button key={cls} onClick={() => { handleNavbarClassSelect(cls); setMobileMenuOpen(false); }} className="px-3 py-1.5 rounded-lg bg-slate-900 text-amber-400 text-xs font-bold border border-slate-800">{cls}</button>))}
            </div>
            <button onClick={() => { setShowDemoBookModal(true); setMobileMenuOpen(false); }} className="w-full bg-amber-500 text-slate-950 font-extrabold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1.5">
              <Calendar className="w-4 h-4" /> Register / Book Free Demo Class
            </button>
          </div>
        )}
      </header>

      {/* VIEW 1: PUBLIC LANDING PAGE */}
      {activeView === 'landing' && (
        <div className="flex-1">
          <section className="relative overflow-hidden py-12 lg:py-20 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white border-b-4 border-amber-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
                <span className="inline-flex items-center gap-2 bg-amber-500/15 border border-amber-400/40 text-amber-300 text-xs font-extrabold px-3.5 py-1.5 rounded-full uppercase">
                  <Award className="w-4 h-4 text-amber-400" /> Takshashila Academy Coaching Institute
                </span>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                  Dedicated <span className="text-amber-400">Class 10th & 12th</span> Board & Competitive Coaching
                </h1>
                <p className="text-slate-300 text-sm sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Complete Chapter-wise Syllabus, Smart Lectures, Admin-Uploaded PDF Notes, and Real-Time Timed Board Mock Tests.
                </p>

                <div className="bg-slate-900/90 border-2 border-amber-500/50 rounded-2xl p-4 max-w-xl mx-auto lg:mx-0 shadow-xl">
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-extrabold uppercase text-amber-400 mb-3">
                    <Timer className="w-4 h-4 animate-pulse" /> Countdown to Board Exams:
                  </div>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    {[{ label: 'Days', val: countdown.days }, { label: 'Hours', val: countdown.hours }, { label: 'Mins', val: countdown.mins }, { label: 'Secs', val: countdown.secs }].map((item, idx) => (
                      <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-2">
                        <span className="text-xl sm:text-2xl font-extrabold text-amber-400 block leading-none">{String(item.val).padStart(2, '0')}</span>
                        <span className="text-[10px] uppercase font-bold text-slate-400 mt-1 block">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 justify-center lg:justify-start pt-2">
                  <a href="#batches-explorer" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl shadow-xl transition text-center flex items-center justify-center gap-2 text-sm">Explore Batches <ArrowRight className="w-4 h-4" /></a>
                  <a href="#syllabus-explorer" className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/40 font-extrabold px-6 py-3.5 rounded-xl transition text-center flex items-center justify-center gap-2 text-sm"><Layers className="w-4 h-4" /> 10th & 12th Syllabus</a>
                  <button onClick={() => setShowPreviewModal(true)} className="bg-slate-900 hover:bg-slate-800 border-2 border-amber-500/50 text-white font-bold px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 transition text-sm"><PlayCircle className="w-5 h-5 text-amber-400" /> Watch Demo</button>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="bg-slate-900 rounded-2xl border-2 border-amber-500 shadow-2xl overflow-hidden">
                  <div className="bg-slate-950 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                    <span className="text-xs font-extrabold text-amber-400 flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" /> SMART CLASSROOM</span>
                    <span className="text-[11px] bg-blue-950 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 rounded-full font-bold">Takshashila Demo</span>
                  </div>
                  <div onClick={() => setShowPreviewModal(true)} className="aspect-video relative group cursor-pointer bg-black">
                    <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80" alt="Demo" className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent flex flex-col justify-end p-5">
                      <span className="text-xs font-bold text-amber-400 uppercase">Er. Saurabh Mishra (IIT Kanpur)</span>
                      <p className="text-white font-extrabold text-base">Physics Derivations & Trigonometry Masterclass</p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-amber-500 text-slate-950 rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition"><Play className="w-7 h-7 fill-slate-950 ml-0.5" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Syllabus Explorer */}
          <section id="syllabus-explorer" className="py-14 bg-white border-b border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1 rounded-full">Updated Curriculum 2026-27</span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">Class 10th & 12th Syllabus Explorer</h2>
                  <p className="text-slate-600 text-sm sm:text-base mt-1">Select your class to view chapter-wise topics, marks weightage, and download official syllabus PDF.</p>
                </div>
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {['Class 10th', 'Class 12th Science', 'Class 12th Commerce'].map((cls) => (
                    <button key={cls} onClick={() => setActiveSyllabusTab(cls)} className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition ${activeSyllabusTab === cls ? 'bg-slate-900 text-amber-400 border-2 border-amber-500 shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                      {cls}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 border-2 border-amber-500 shadow-xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                  <div>
                    <span className="text-xs font-extrabold uppercase text-amber-400">{activeSyllabusBatch?.stream}</span>
                    <h3 className="text-xl sm:text-2xl font-extrabold mt-1">{activeSyllabusBatch?.title}</h3>
                    <p className="text-xs text-slate-400 mt-1">Timings: {activeSyllabusBatch?.timings} • Mode: {activeSyllabusBatch?.mode}</p>
                  </div>
                  <button onClick={() => handleDownloadGeneratedFile(`${activeSyllabusTab.replace(/\s+/g, '_')}_Syllabus.pdf`, `${activeSyllabusTab} Complete Syllabus`)} className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-5 py-3 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shrink-0 shadow-md">
                    <Download className="w-4 h-4" /> Download Syllabus PDF
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {activeSyllabusBatch?.syllabus.map((unit, idx) => (
                    <div key={idx} className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className="bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-extrabold px-2.5 py-1 rounded-md">{unit.subject}</span>
                          <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-800">{unit.weightage}</span>
                        </div>
                        <h4 className="font-extrabold text-base text-white">{unit.unit}</h4>
                        <ul className="space-y-2 text-xs text-slate-300">
                          {unit.chapters.map((ch, cIdx) => (<li key={cIdx} className="flex items-start gap-2"><CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" /><span>{ch}</span></li>))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Batch Explorer */}
          <section id="batches-explorer" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-950 bg-amber-400 px-3 py-1 rounded-full">Offline + Online Batches</span>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">Explore Coaching Batches</h2>
                <p className="text-slate-600 mt-1 text-sm sm:text-base">Enroll to unlock video lectures, PDF notes, and live timed mock tests.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search batches..." className="pl-9 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 outline-none w-full sm:w-60" />
                </div>
                <div className="flex gap-1.5 overflow-x-auto pb-1">
                  {classOptions.map((cls) => (<button key={cls} onClick={() => setSelectedClassFilter(cls)} className={`px-3.5 py-2.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition ${selectedClassFilter === cls ? 'bg-slate-900 text-amber-400 shadow-sm border border-amber-500' : 'bg-white text-slate-700 border border-slate-200'}`}>{cls}</button>))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBatches.map((batch) => {
                const isEnrolled = enrolledBatchIds.includes(batch.id);
                return (
                  <div key={batch.id} className="bg-white rounded-2xl border-2 border-slate-200 hover:border-amber-500 overflow-hidden shadow-sm hover:shadow-xl transition flex flex-col">
                    <div className="relative h-52 bg-slate-900 overflow-hidden">
                      <img src={batch.image} alt={batch.title} className="w-full h-full object-cover opacity-85" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                      <div className="absolute top-3 left-3 flex flex-wrap items-center gap-2">
                        <span className="bg-amber-500 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-lg">{batch.targetClass}</span>
                        <span className="bg-slate-900 text-amber-300 border border-amber-400/40 text-[11px] font-bold px-2.5 py-1 rounded-lg">{batch.liveTag}</span>
                      </div>
                      {isEnrolled && (<span className="absolute top-3 right-3 bg-emerald-500 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-lg flex items-center gap-1"><Check className="w-3.5 h-3.5 stroke-[3]" /> Enrolled</span>)}
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                        <span className="text-xs font-bold text-amber-300">{batch.stream}</span>
                        <span className="flex items-center gap-1 text-xs font-bold bg-slate-900/90 px-2.5 py-1 rounded-md text-amber-400"><Star className="w-3.5 h-3.5 fill-amber-400" /> {batch.rating}</span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs"><span className="font-bold text-slate-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-md flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-600" /> {batch.timings}</span></div>
                        <h3 className="font-extrabold text-xl text-slate-900 leading-snug">{batch.title}</h3>
                        <p className="text-slate-600 text-sm leading-relaxed">{batch.description}</p>
                      </div>
                      <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                        <div>
                          <span className="text-xs text-slate-400 line-through font-semibold">₹{batch.oldPrice?.toLocaleString('en-IN')}</span>
                          <div className="flex items-baseline gap-1.5"><span className="text-2xl font-extrabold text-slate-900">₹{batch.price.toLocaleString('en-IN')}</span><span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">BOARD95</span></div>
                        </div>
                        <button onClick={() => handleEnrollClick(batch)} className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold transition shadow-md flex items-center gap-1.5 ${isEnrolled ? 'bg-slate-900 hover:bg-slate-800 text-amber-400 border border-amber-500/40' : 'bg-amber-500 hover:bg-amber-400 text-slate-950'}`}>
                          {isEnrolled ? <>Go to Portal <ChevronRight className="w-4 h-4" /></> : <>Enroll Now <ArrowRight className="w-4 h-4" /></>}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* PDF Vault */}
          <section className="py-14 bg-slate-100 border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1 rounded-full">Direct PDF Downloads ({studyMaterials.length} Files)</span>
                  <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 mt-2">Study Material & Admin-Uploaded PDF Vault</h2>
                  <p className="text-slate-600 text-sm sm:text-base mt-1">Every PDF uploaded by Admin in the Admin Panel immediately appears here.</p>
                </div>
                <button onClick={() => { 
                  if (isAdminLoggedIn) {
                    setActiveView('admin'); 
                    setAdminTab('pdfs');
                  } else {
                    setShowAdminLoginModal(true);
                  }
                }} className="bg-slate-900 hover:bg-slate-800 text-amber-400 text-xs font-extrabold px-4 py-2.5 rounded-xl flex items-center gap-2 self-start sm:self-auto"><Upload className="w-4 h-4" /> Upload New PDF (Admin)</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {studyMaterials.map((item) => (
                  <div key={item.id} className="bg-white p-6 rounded-2xl border-2 border-slate-200 hover:border-amber-500 shadow-sm transition flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between gap-1 flex-wrap">
                        <span className="bg-slate-900 text-amber-400 text-[11px] font-extrabold px-2.5 py-1 rounded-md">{item.targetClass}</span>
                        <span className="text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">{item.category}</span>
                      </div>
                      <h3 className="font-extrabold text-base text-slate-900 leading-snug">{item.title}</h3>
                      <p className="text-xs text-slate-500">Subject: {item.subject} • {item.uploadedAt}</p>
                      {item.fileDataUrl && (<span className="inline-block text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">✓ Real Uploaded PDF</span>)}
                    </div>
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-500 font-semibold">{item.downloads.toLocaleString()}+ Downloads</span>
                      <button onClick={() => handleDownloadMaterial(item)} className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm"><Download className="w-3.5 h-3.5" /> Download</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Board Toppers */}
          <section className="py-14 bg-slate-900 text-white border-y-4 border-amber-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-xs font-extrabold uppercase tracking-widest text-slate-950 bg-amber-400 px-3 py-1 rounded-full">Proven Results</span>
                <h2 className="text-2xl sm:text-4xl font-extrabold mt-3">Takshashila Academy Board Toppers</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {BOARD_TOPPERS.map((topper, idx) => (
                  <div key={idx} className="bg-slate-950 p-6 rounded-2xl border border-slate-800 flex flex-col justify-between space-y-5">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between"><span className="bg-amber-500 text-slate-950 text-lg font-extrabold px-3.5 py-1 rounded-xl shadow">{topper.score}</span><span className="text-xs font-bold text-amber-400">{topper.batch}</span></div>
                      <p className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-700/40 px-3 py-1.5 rounded-lg">{topper.subHighlight}</p>
                      <p className="text-slate-300 text-sm italic">"{topper.quote}"</p>
                    </div>
                    <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                      <img src={topper.avatar} alt={topper.name} className="w-12 h-12 rounded-full object-cover border-2 border-amber-400" />
                      <div><p className="text-sm font-extrabold text-white">{topper.name}</p><p className="text-xs text-amber-400 font-semibold">{topper.exam}</p></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Registration Backend Form */}
          <section className="py-14 bg-slate-950 text-white px-4 sm:px-6">
            <div className="max-w-5xl mx-auto bg-slate-900 p-6 sm:p-10 rounded-2xl border-2 border-amber-500 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 space-y-4">
                <span className="inline-flex items-center gap-1.5 bg-amber-500 text-slate-950 text-xs font-extrabold px-3 py-1 rounded-md uppercase"><PhoneCall className="w-3.5 h-3.5" /> Admission Desk</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold leading-tight">Register for Admission & Free 3-Day Demo Class</h2>
                <p className="text-slate-300 text-sm leading-relaxed">Submitting this form automatically registers you in the <strong>Takshashila Admin CRM</strong> database.</p>
              </div>
              <form onSubmit={handleSubmitEnquiry} className="lg:col-span-6 space-y-3.5 bg-slate-950 p-6 rounded-2xl border border-slate-800">
                <h3 className="font-extrabold text-base text-amber-400">Student Registration Form</h3>
                <div><label className="text-xs font-bold text-slate-400 block mb-1">Student Full Name *</label><input type="text" value={enquiryForm.studentName} onChange={(e) => setEnquiryForm({ ...enquiryForm, studentName: e.target.value })} placeholder="Enter Full Name" className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm outline-none focus:border-amber-400" required /></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div><label className="text-xs font-bold text-slate-400 block mb-1">Select Class</label><select value={enquiryForm.targetClass} onChange={(e) => setEnquiryForm({ ...enquiryForm, targetClass: e.target.value })} className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold"><option value="Class 10th">Class 10th</option><option value="Class 12th Science">Class 12th Science</option><option value="Class 12th Commerce">Class 12th Commerce</option></select></div>
                  <div><label className="text-xs font-bold text-slate-400 block mb-1">Select Board</label><select value={enquiryForm.board} onChange={(e) => setEnquiryForm({ ...enquiryForm, board: e.target.value })} className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs font-bold"><option value="CBSE Board">CBSE Board</option><option value="ICSE Board">ICSE Board</option><option value="State Board">State Board</option></select></div>
                </div>
                <div><label className="text-xs font-bold text-slate-400 block mb-1">Mobile Number *</label><input type="tel" value={enquiryForm.phone} onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })} placeholder="10-Digit Mobile No." className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white text-sm" required /></div>
                <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3.5 rounded-xl transition shadow-lg text-sm">Complete Registration & Book Demo</button>
              </form>
            </div>
          </section>
        </div>
      )}

      {/* VIEW 2: STUDENT PORTAL */}
      {activeView === 'student' && (
        <div className="flex-1 flex flex-col bg-slate-950 text-slate-100">
          <div className="bg-slate-900 border-b border-slate-800 px-4 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              <span className="text-xs font-extrabold uppercase text-amber-400 shrink-0">My Batches:</span>
              {batches.filter((b) => enrolledBatchIds.includes(b.id)).map((batch) => (
                <button key={batch.id} onClick={() => { setActiveBatchId(batch.id); setActiveLessonId(batch.lessons[0]?.id || ''); setSelectedSubjectTab('All'); }} className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition whitespace-nowrap flex items-center gap-1.5 ${activeBatch?.id === batch.id ? 'bg-amber-500 text-slate-950 shadow-sm' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}>
                  <span>{batch.targetClass}:</span> {batch.title.split(':')[0]}
                </button>
              ))}
            </div>
            <button onClick={() => setActiveView('landing')} className="text-xs font-extrabold text-amber-400 hover:text-amber-300">+ Explore More Batches</button>
          </div>

          <div className="flex-1 flex flex-col lg:flex-row">
            <main className="flex-1 flex flex-col">
              <div className="w-full aspect-video max-h-[480px] bg-black relative flex items-center justify-center border-b border-slate-800">
                <video ref={videoRef} key={activeLesson?.id} controls className="w-full h-full object-contain" poster={activeBatch?.image}><source src={activeLesson?.videoUrl} type="video/mp4" />Your browser does not support video.</video>
              </div>
              <div className="p-4 sm:p-8 max-w-4xl w-full mx-auto space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2"><span className="bg-amber-500 text-slate-950 text-xs font-extrabold px-2.5 py-0.5 rounded">{activeBatch?.targetClass}</span><span className="text-xs font-bold text-amber-400 uppercase">{activeLesson?.subject} • {activeLesson?.faculty}</span></div>
                    <h1 className="text-xl sm:text-2xl font-extrabold mt-2 text-white">{activeLesson?.title}</h1>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
                      <span>Duration: {activeLesson?.duration}</span>
                      <div className="flex items-center gap-1.5"><span className="font-bold text-slate-300">Speed:</span>{['1x', '1.25x', '1.5x', '2x'].map((spd) => (<button key={spd} onClick={() => handlePlaybackSpeedChange(spd)} className={`px-2.5 py-0.5 rounded font-extrabold transition ${playbackSpeed === spd ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>{spd}</button>))}</div>
                    </div>
                  </div>
                  <button onClick={() => activeLesson && toggleLessonComplete(activeLesson.id)} className={`px-5 py-3 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 transition shrink-0 ${activeLesson?.completed ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg'}`}>
                    <CheckCircle2 className="w-4 h-4" />{activeLesson?.completed ? 'Completed ✓' : 'Mark as Complete'}
                  </button>
                </div>

                <div>
                  <h2 className="text-xs font-extrabold uppercase tracking-wider text-amber-400 mb-3">Lecture Notes & Live Mock Test</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <button onClick={() => handleDownloadGeneratedFile(activeLesson?.pdfName || 'Notes.pdf', activeLesson?.title || 'Notes')} className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 transition text-left">
                      <div className="flex items-center gap-3"><div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400"><FileText className="w-5 h-5" /></div><div><p className="font-bold text-sm text-white">Lecture Notes (PDF)</p><p className="text-xs text-slate-400">{activeLesson?.pdfName}</p></div></div><Download className="w-4 h-4 text-amber-400 shrink-0" />
                    </button>
                    <button onClick={() => handleDownloadGeneratedFile(activeLesson?.dppName || 'DPP.pdf', 'DPP')} className="flex items-center justify-between p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500 transition text-left">
                      <div className="flex items-center gap-3"><div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400"><BookMarked className="w-5 h-5" /></div><div><p className="font-bold text-sm text-white">Chapter DPP Sheet</p><p className="text-xs text-slate-400">{activeLesson?.dppName}</p></div></div><Download className="w-4 h-4 text-blue-400 shrink-0" />
                    </button>
                    <button onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); setQuizTimeLeft(180); setShowQuizModal(true); }} className="sm:col-span-2 flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-amber-500/20 to-slate-900 border-2 border-amber-500 transition text-left">
                      <div className="flex items-center gap-3"><div className="p-2.5 rounded-xl bg-amber-500 text-slate-950"><Timer className="w-5 h-5" /></div><div><p className="font-extrabold text-sm text-amber-300">Start Live Timed Mock Test (MCQ)</p><p className="text-xs text-slate-300">{activeLesson?.quiz?.length || 1} Questions • Instant Evaluation & Solutions</p></div></div><span className="text-xs font-extrabold bg-amber-500 text-slate-950 px-3.5 py-2 rounded-lg shrink-0">Attempt Now →</span>
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-4">
                  <h3 className="font-extrabold text-sm text-amber-400 uppercase flex items-center gap-2"><FileUp className="w-4 h-4" /> Admin-Uploaded PDF Material ({studyMaterials.length})</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {studyMaterials.map((mat) => (
                      <div key={mat.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                        <div className="min-w-0"><span className="text-[10px] font-extrabold text-amber-400 uppercase block">{mat.targetClass} • {mat.subject}</span><p className="text-xs font-bold text-white truncate">{mat.title}</p></div>
                        <button onClick={() => handleDownloadMaterial(mat)} className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-extrabold flex items-center gap-1 shrink-0"><Download className="w-3.5 h-3.5" /> PDF</button>
                      </div>
                    ))}
                  </div>
                </div>

                {testHistory.length > 0 && (
                  <div className="bg-slate-900 rounded-2xl border border-slate-800 p-5 space-y-3">
                    <h3 className="font-extrabold text-sm text-amber-400 uppercase flex items-center gap-2"><Trophy className="w-4 h-4" /> My Mock Test Scores</h3>
                    <div className="space-y-2">
                      {testHistory.map((att) => (
                        <div key={att.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-xs">
                          <div><p className="font-bold text-white">{att.lessonTitle}</p><p className="text-slate-400">{att.batchTitle} • {att.date}</p></div>
                          <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-3 py-1 rounded-lg font-extrabold">{att.score}/{att.total} ({att.percentage}%)</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </main>

            <aside className="w-full lg:w-96 bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col">
              <div className="p-5 border-b border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs font-extrabold uppercase"><span className="text-slate-300">Course Completion</span><span className="text-amber-400">{completedCount}/{totalCount} ({progressPct}%)</span></div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${progressPct}%` }} /></div>
              </div>
              <div className="divide-y divide-slate-800 overflow-y-auto flex-1">
                {filteredBatchLessons.map((lesson) => {
                  const isActive = lesson.id === activeLesson?.id;
                  return (
                    <button key={lesson.id} onClick={() => setActiveLessonId(lesson.id)} className={`w-full p-4 flex items-center justify-between text-left transition ${isActive ? 'bg-slate-950 border-l-4 border-amber-500' : 'hover:bg-slate-800/50'}`}>
                      <div className="flex items-start gap-3">
                        {lesson.completed ? <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /> : <Play className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />}
                        <div><span className="text-[10px] font-extrabold uppercase text-amber-400 block">{lesson.subject}</span><p className={`text-sm leading-snug ${isActive ? 'text-white font-extrabold' : 'text-slate-300 font-medium'}`}>{lesson.title}</p><p className="text-xs text-slate-500 mt-1">{lesson.duration} • {lesson.quiz.length} MCQs</p></div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>
      )}

      {/* VIEW 3: ADMIN PANEL */}
      {activeView === 'admin' && (
        <div className="flex-1 bg-slate-50 p-4 sm:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 rounded-2xl border-b-4 border-amber-500 shadow-lg">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-amber-400">Takshashila Backend Command Center</span>
                <h1 className="text-2xl sm:text-3xl font-extrabold mt-1">Admin Panel</h1>
                <p className="text-slate-300 text-sm mt-0.5">Upload Real PDFs, Build Mock Tests, Manage Batches, and Track Student Fees.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setAdminTab('pdfs')} className="bg-slate-800 hover:bg-slate-700 text-amber-400 border border-amber-500/40 font-extrabold px-4 py-3 rounded-xl flex items-center gap-2 text-xs sm:text-sm"><Upload className="w-4 h-4" /> Upload PDF</button>
                <button onClick={openAddBatch} className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-4 py-3 rounded-xl flex items-center gap-2 text-xs sm:text-sm shadow-md"><PlusCircle className="w-4 h-4" /> + New Batch</button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4"><div className="p-3.5 bg-slate-900 text-amber-400 rounded-xl"><Users className="w-6 h-6" /></div><div><p className="text-xs font-bold text-slate-500 uppercase">Enrolled Students</p><p className="text-2xl font-extrabold text-slate-900">{totalEnrolledStudents}</p></div></div>
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4"><div className="p-3.5 bg-amber-100 text-amber-700 rounded-xl"><DollarSign className="w-6 h-6" /></div><div><p className="text-xs font-bold text-slate-500 uppercase">Total Revenue</p><p className="text-2xl font-extrabold text-slate-900">₹{totalFeeCollection.toLocaleString('en-IN')}</p></div></div>
              <div onClick={() => setAdminTab('pdfs')} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 cursor-pointer hover:border-amber-500"><div className="p-3.5 bg-emerald-100 text-emerald-700 rounded-xl"><FileText className="w-6 h-6" /></div><div><p className="text-xs font-bold text-slate-500 uppercase">Uploaded PDFs</p><p className="text-2xl font-extrabold text-slate-900">{studyMaterials.length} Files</p></div></div>
              <div onClick={() => setAdminTab('enquiries')} className="bg-white p-5 rounded-2xl border-2 border-amber-400 shadow-sm flex items-center gap-4 cursor-pointer hover:bg-amber-50/30"><div className="p-3.5 bg-rose-100 text-rose-700 rounded-xl"><ClipboardList className="w-6 h-6" /></div><div><p className="text-xs font-bold text-slate-500 uppercase">Registration Leads</p><p className="text-2xl font-extrabold text-rose-600">{pendingEnquiriesCount} Pending</p></div></div>
            </div>

            <div className="flex gap-2 overflow-x-auto border-b border-slate-200 pb-3">
              <button onClick={() => setAdminTab('batches')} className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap ${adminTab === 'batches' ? 'bg-slate-900 text-amber-400' : 'bg-white text-slate-700 border'}`}>1. Batches & Lectures ({batches.length})</button>
              <button onClick={() => setAdminTab('pdfs')} className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap ${adminTab === 'pdfs' ? 'bg-slate-900 text-amber-400' : 'bg-white text-slate-700 border'}`}>2. Upload PDF Notes ({studyMaterials.length})</button>
              <button onClick={() => setAdminTab('mocktests')} className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap ${adminTab === 'mocktests' ? 'bg-slate-900 text-amber-400' : 'bg-white text-slate-700 border'}`}>3. Mock Test Builder</button>
              <button onClick={() => setAdminTab('students')} className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap ${adminTab === 'students' ? 'bg-slate-900 text-amber-400' : 'bg-white text-slate-700 border'}`}>4. Registered Students ({studentRecords.length})</button>
              <button onClick={() => setAdminTab('enquiries')} className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold whitespace-nowrap ${adminTab === 'enquiries' ? 'bg-slate-900 text-amber-400' : 'bg-white text-slate-700 border'}`}>5. Demo Leads ({enquiries.length})</button>
            </div>

            {adminTab === 'batches' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200 flex justify-between items-center"><h2 className="font-extrabold text-lg text-slate-900">Manage Batches & Lectures</h2><button onClick={openAddBatch} className="bg-slate-900 text-amber-400 px-4 py-2 rounded-xl text-xs font-extrabold">+ Add Batch</button></div>
                <div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className="bg-slate-900 text-amber-400 text-xs uppercase"><th className="py-3.5 px-5">Class</th><th className="py-3.5 px-5">Batch Title</th><th className="py-3.5 px-5">Timings</th><th className="py-3.5 px-5">Fee</th><th className="py-3.5 px-5 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-200 text-sm">{batches.map((b) => (<tr key={b.id} className="hover:bg-amber-50/30"><td className="py-4 px-5"><span className="bg-slate-900 text-amber-400 text-xs font-extrabold px-2.5 py-1 rounded whitespace-nowrap">{b.targetClass}</span></td><td className="py-4 px-5 font-bold text-slate-900">{b.title}</td><td className="py-4 px-5 text-xs text-slate-600">{b.timings}</td><td className="py-4 px-5 font-extrabold">₹{b.price.toLocaleString('en-IN')}</td><td className="py-4 px-5 text-right space-x-2 whitespace-nowrap"><button onClick={() => openEditBatch(b)} className="bg-amber-400 hover:bg-amber-500 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-extrabold inline-flex items-center gap-1"><Edit className="w-3.5 h-3.5" /> Edit</button><button onClick={() => deleteBatch(b.id)} className="text-rose-600 p-1.5"><Trash2 className="w-4 h-4" /></button></td></tr>))}</tbody></table></div>
              </div>
            )}

            {adminTab === 'pdfs' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <form onSubmit={handleAdminUploadPdf} className="lg:col-span-5 bg-white p-6 rounded-2xl border-2 border-amber-500 shadow-sm space-y-4">
                  <div className="flex items-center gap-2 text-slate-900"><FileUp className="w-5 h-5 text-amber-600" /><h2 className="font-extrabold text-lg">Upload PDF Study Material</h2></div>
                  <div><label className="text-xs font-bold text-slate-700 block mb-1">Select PDF File</label><input ref={fileInputRef} type="file" accept=".pdf,application/pdf" onChange={handleFileChange} className="w-full text-xs file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-slate-900 file:text-amber-400 border border-slate-300 rounded-xl p-1.5" />{pdfUploadForm.fileName && (<p className="text-[11px] font-bold text-emerald-600 mt-1">✓ Attached: {pdfUploadForm.fileName}</p>)}</div>
                  <div><label className="text-xs font-bold text-slate-700 block mb-1">Document Title *</label><input type="text" value={pdfUploadForm.title} onChange={(e) => setPdfUploadForm({ ...pdfUploadForm, title: e.target.value })} placeholder="e.g. Physics Optics Notes" className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm outline-none" required /></div>
                  <div className="grid grid-cols-2 gap-3">
                    <div><label className="text-xs font-bold text-slate-700 block mb-1">Target Class</label><select value={pdfUploadForm.targetClass} onChange={(e) => setPdfUploadForm({ ...pdfUploadForm, targetClass: e.target.value })} className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs font-bold"><option value="Class 10th">Class 10th</option><option value="Class 12th Science">Class 12th Science</option><option value="Class 12th Commerce">Class 12th Commerce</option></select></div>
                    <div><label className="text-xs font-bold text-slate-700 block mb-1">Category</label><select value={pdfUploadForm.category} onChange={(e) => setPdfUploadForm({ ...pdfUploadForm, category: e.target.value })} className="w-full px-3 py-2.5 border border-slate-300 rounded-xl text-xs font-bold"><option value="Handwritten Notes">Handwritten Notes</option><option value="Sample Papers">Sample Papers</option><option value="Formula Sheet">Formula Sheet</option><option value="10-Year PYQs">10-Year PYQs</option></select></div>
                  </div>
                  <button type="submit" className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-3 rounded-xl text-sm shadow-md flex items-center justify-center gap-2"><Upload className="w-4 h-4" /> Publish PDF to Portal</button>
                </form>
                <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"><div className="p-5 border-b border-slate-200"><h3 className="font-extrabold text-base text-slate-900">Published Study Materials ({studyMaterials.length})</h3></div><div className="divide-y divide-slate-200">{studyMaterials.map((item) => (<div key={item.id} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50"><div className="space-y-1"><div className="flex items-center gap-2"><span className="bg-slate-900 text-amber-400 text-[10px] font-extrabold px-2 py-0.5 rounded">{item.targetClass}</span><span className="text-xs font-bold text-amber-700">{item.category}</span></div><p className="font-extrabold text-sm text-slate-900">{item.title}</p></div><button onClick={() => handleDeleteMaterial(item.id)} className="text-rose-600 p-1.5 hover:bg-rose-50 rounded-lg"><Trash2 className="w-4 h-4" /></button></div>))}</div></div>
              </div>
            )}

            {adminTab === 'mocktests' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <form onSubmit={handleAddMockQuestion} className="lg:col-span-6 bg-white p-6 rounded-2xl border-2 border-amber-500 shadow-sm space-y-4">
                  <div className="flex items-center gap-2"><HelpCircle className="w-5 h-5 text-amber-600" /><h2 className="font-extrabold text-lg text-slate-900">Add MCQ to Mock Test</h2></div>
                  <div><label className="text-xs font-bold text-slate-700 block mb-1">Target Batch</label><select value={mcqForm.batchId} onChange={(e) => setMcqForm({ ...mcqForm, batchId: e.target.value })} className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-bold">{batches.map((b) => (<option key={b.id} value={b.id}>{b.targetClass} — {b.title.split(':')[0]}</option>))}</select></div>
                  <div><label className="text-xs font-bold text-slate-700 block mb-1">Question Statement *</label><textarea rows={2} value={mcqForm.question} onChange={(e) => setMcqForm({ ...mcqForm, question: e.target.value })} placeholder="Enter MCQ question..." className="w-full px-3.5 py-2 border border-slate-300 rounded-xl text-sm outline-none" required /></div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input type="text" value={mcqForm.optionA} onChange={(e) => setMcqForm({ ...mcqForm, optionA: e.target.value })} placeholder="Option A *" className="px-3 py-2 border rounded-xl text-xs" required />
                    <input type="text" value={mcqForm.optionB} onChange={(e) => setMcqForm({ ...mcqForm, optionB: e.target.value })} placeholder="Option B *" className="px-3 py-2 border rounded-xl text-xs" required />
                    <input type="text" value={mcqForm.optionC} onChange={(e) => setMcqForm({ ...mcqForm, optionC: e.target.value })} placeholder="Option C *" className="px-3 py-2 border rounded-xl text-xs" required />
                    <input type="text" value={mcqForm.optionD} onChange={(e) => setMcqForm({ ...mcqForm, optionD: e.target.value })} placeholder="Option D *" className="px-3 py-2 border rounded-xl text-xs" required />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div><label className="text-xs font-bold text-slate-700 block mb-1">Correct Option</label><select value={mcqForm.correctOption} onChange={(e) => setMcqForm({ ...mcqForm, correctOption: Number(e.target.value) })} className="w-full px-3 py-2 border rounded-xl text-xs font-bold"><option value={0}>Option A</option><option value={1}>Option B</option><option value={2}>Option C</option><option value={3}>Option D</option></select></div>
                    <div><label className="text-xs font-bold text-slate-700 block mb-1">Solution / Explanation</label><input type="text" value={mcqForm.solution} onChange={(e) => setMcqForm({ ...mcqForm, solution: e.target.value })} placeholder="Formula or solution" className="w-full px-3 py-2 border rounded-xl text-xs" /></div>
                  </div>
                  <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-extrabold py-3 rounded-xl text-xs shadow-md">+ Add Question to Mock Test</button>
                </form>
                <div className="lg:col-span-6 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-extrabold text-base text-slate-900">Active Questions in Selected Batch</h3>
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-1">{(batches.find((b) => b.id === mcqForm.batchId)?.lessons[0]?.quiz || []).map((q, i) => (<div key={q.id || i} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs"><p className="font-extrabold text-slate-900">Q{i + 1}. {q.question}</p><p className="text-emerald-700 font-bold">Answer: {q.options[q.answer]}</p><p className="text-slate-500">{q.solution}</p></div>))}</div>
                </div>
              </div>
            )}

            {adminTab === 'students' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row justify-between gap-4">
                  <h2 className="font-extrabold text-lg text-slate-900">Registered Students & Fee Tracker</h2>
                  <div className="flex gap-2"><input type="text" value={studentSearch} onChange={(e) => setStudentSearch(e.target.value)} placeholder="Search student..." className="px-3.5 py-2 border rounded-xl text-xs outline-none" />{['All', 'Paid', 'Pending'].map((st) => (<button key={st} onClick={() => setStudentStatusFilter(st)} className={`px-3 py-2 rounded-xl text-xs font-extrabold ${studentStatusFilter === st ? 'bg-slate-900 text-amber-400' : 'bg-slate-100'}`}>{st}</button>))}</div>
                </div>
                <div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className="bg-slate-900 text-amber-400 text-xs uppercase"><th className="py-3.5 px-5">ID</th><th className="py-3.5 px-5">Name</th><th className="py-3.5 px-5">Class</th><th className="py-3.5 px-5">Phone</th><th className="py-3.5 px-5">Fee Status</th></tr></thead><tbody className="divide-y divide-slate-200 text-sm">{filteredStudentRecords.map((stu) => (<tr key={stu.id} className="hover:bg-slate-50"><td className="py-4 px-5 font-mono text-xs text-slate-500">{stu.id}</td><td className="py-4 px-5 font-extrabold text-slate-900">{stu.name}</td><td className="py-4 px-5"><span className="text-xs font-bold bg-amber-100 px-2 py-0.5 rounded">{stu.studentClass}</span></td><td className="py-4 px-5 font-bold text-xs">{stu.parentPhone}</td><td className="py-4 px-5"><button onClick={() => toggleStudentFee(stu.id)} className={`px-3 py-1 rounded-full text-xs font-extrabold ${stu.feeStatus === 'Paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-700'}`}>{stu.feeStatus === 'Paid' ? '✓ Paid' : '⏳ Pending'} (₹{stu.feeAmount})</button></td></tr>))}</tbody></table></div>
              </div>
            )}

            {adminTab === 'enquiries' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-200"><h2 className="font-extrabold text-lg">Admission Enquiry Leads</h2></div>
                <div className="overflow-x-auto"><table className="w-full text-left border-collapse"><thead><tr className="bg-slate-900 text-amber-400 text-xs uppercase"><th className="py-3.5 px-5">Student</th><th className="py-3.5 px-5">Class & Board</th><th className="py-3.5 px-5">Phone</th><th className="py-3.5 px-5">Status</th></tr></thead><tbody className="divide-y divide-slate-200 text-sm">{enquiries.map((enq) => (<tr key={enq.id} className="hover:bg-slate-50"><td className="py-4 px-5 font-extrabold">{enq.studentName}</td><td className="py-4 px-5"><span className="bg-slate-900 text-amber-400 text-xs px-2 py-0.5 rounded">{enq.targetClass}</span> {enq.board}</td><td className="py-4 px-5 font-bold text-blue-900">{enq.phone}</td><td className="py-4 px-5"><button onClick={() => cycleEnquiry(enq.id)} className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-800">{enq.status} ↻</button></td></tr>))}</tbody></table></div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {checkoutBatch && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border-2 border-amber-500">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b-2 border-amber-500"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold text-lg">T</div><div><span className="text-[11px] uppercase tracking-wider text-amber-400 font-extrabold block">Instant Enrollment</span><h3 className="font-extrabold text-sm line-clamp-1">{checkoutBatch.title}</h3></div></div><button onClick={() => setCheckoutBatch(null)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button></div>
            <form onSubmit={handleCompletePayment} className="p-6 space-y-4">
              <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center justify-between"><div><p className="text-xs text-slate-400">Payable Fee</p><p className="text-2xl font-extrabold text-amber-400">₹{(couponApplied ? Math.max(checkoutBatch.price - 500, 999) : checkoutBatch.price).toLocaleString('en-IN')}</p></div><span className="text-xs font-extrabold text-slate-950 bg-amber-400 px-2.5 py-1 rounded-lg flex items-center gap-1"><ShieldCheck className="w-4 h-4" /> Secure</span></div>
              <div className="bg-amber-50 border border-amber-300 p-3 rounded-xl flex items-center justify-between text-xs"><span className="font-extrabold text-slate-800 flex items-center gap-1"><Tag className="w-3.5 h-3.5 text-amber-600" /> Coupon BOARD95 (-₹500)</span><span className="text-emerald-700 font-extrabold">Applied ✓</span></div>
              <div className="grid grid-cols-2 gap-2">{[{ id: 'upi', label: 'UPI / QR', icon: Smartphone }, { id: 'card', label: 'Card', icon: CreditCard }].map((pm) => { const Icon = pm.icon; return (<button key={pm.id} type="button" onClick={() => setPaymentMethod(pm.id)} className={`p-3 rounded-xl border text-xs font-extrabold flex flex-col items-center gap-1 ${paymentMethod === pm.id ? 'border-slate-900 bg-amber-400 text-slate-950' : 'border-slate-200'}`}><Icon className="w-4 h-4" /> {pm.label}</button>); })}</div>
              <button type="submit" disabled={isProcessingPayment} className="w-full bg-slate-900 hover:bg-slate-800 text-amber-400 font-extrabold py-3.5 rounded-xl shadow-lg transition text-sm">{isProcessingPayment ? 'Unlocking...' : 'Pay & Unlock Batch Now'}</button>
            </form>
          </div>
        </div>
      )}

      {/* Timed MCQ Test Modal */}
      {showQuizModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-amber-500 text-white rounded-2xl max-w-xl w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4"><div><span className="text-xs font-extrabold uppercase text-amber-400">Live Mock Test</span><h3 className="text-base font-extrabold mt-0.5">{activeLesson?.title}</h3></div><div className="flex items-center gap-3"><span className="px-3 py-1 rounded-xl text-xs font-extrabold bg-amber-500 text-slate-950 flex items-center gap-1"><Timer className="w-3.5 h-3.5" /> {formatTimer(quizTimeLeft)}</span><button onClick={() => setShowQuizModal(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button></div></div>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
              {currentQuiz.map((q, qIndex) => (
                <div key={q.id || qIndex} className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <p className="text-sm font-bold text-white">Q{qIndex + 1}. {q.question}</p>
                  <div className="space-y-2">
                    {q.options.map((opt, oIndex) => {
                      const isSelected = quizAnswers[qIndex] === oIndex; const isCorrect = q.answer === oIndex;
                      let btnStyle = 'border-slate-800 bg-slate-900 text-slate-300';
                      if (quizSubmitted) { if (isCorrect) btnStyle = 'border-emerald-500 bg-emerald-500/20 text-emerald-300 font-bold'; else if (isSelected) btnStyle = 'border-rose-500 bg-rose-500/20 text-rose-300'; } else if (isSelected) { btnStyle = 'border-amber-500 bg-amber-500 text-slate-950 font-extrabold'; }
                      return (<button key={oIndex} type="button" disabled={quizSubmitted} onClick={() => setQuizAnswers((prev) => ({ ...prev, [qIndex]: oIndex }))} className={`w-full text-left px-3.5 py-2.5 rounded-xl border text-xs transition flex items-center justify-between ${btnStyle}`}><span>{opt}</span>{quizSubmitted && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}</button>);
                    })}
                  </div>
                  {quizSubmitted && q.solution && (<div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300"><strong>Solution:</strong> {q.solution}</div>)}
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
              {quizSubmitted ? (<div className="text-sm font-extrabold text-amber-400">Score: {quizScore} / {currentQuiz.length} ({Math.round((quizScore / currentQuiz.length) * 100)}%)</div>) : <span className="text-xs text-slate-400">Attempt all questions.</span>}
              <div className="flex gap-3"><button onClick={() => setShowQuizModal(false)} className="px-4 py-2 text-xs font-bold text-slate-400">Close</button>{!quizSubmitted && (<button onClick={handleSubmitMockTest} className="bg-amber-500 text-slate-950 font-extrabold px-5 py-2.5 rounded-xl text-xs">Submit Test</button>)}</div>
            </div>
          </div>
        </div>
      )}

      {/* Demo Video Modal */}
      {showPreviewModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-amber-500 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl text-white">
            <div className="p-4 flex items-center justify-between border-b border-slate-800"><div><span className="text-[11px] font-extrabold uppercase text-amber-400 block">{DEMO_LECTURES[demoVideoSelection].targetClass} Demo</span><span className="font-extrabold text-sm">{DEMO_LECTURES[demoVideoSelection].title}</span></div><button onClick={() => setShowPreviewModal(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button></div>
            <div className="aspect-video bg-black"><video key={demoVideoSelection} controls autoPlay className="w-full h-full object-contain" src={DEMO_LECTURES[demoVideoSelection].videoUrl} /></div>
            <div className="p-4 bg-slate-950 flex flex-wrap gap-2 justify-between items-center"><div className="flex flex-wrap gap-2">{DEMO_LECTURES.map((lec, idx) => (<button key={idx} onClick={() => setDemoVideoSelection(idx)} className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition ${demoVideoSelection === idx ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}>{lec.targetClass}</button>))}</div><button onClick={() => { setShowPreviewModal(false); setShowDemoBookModal(true); }} className="bg-amber-500 text-slate-950 text-xs font-extrabold px-4 py-2 rounded-xl">Register for Batch →</button></div>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {showDemoBookModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-amber-500 text-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3"><h3 className="text-lg font-extrabold">Student Registration & Demo</h3><button onClick={() => setShowDemoBookModal(false)} className="text-slate-400"><X className="w-5 h-5" /></button></div>
            <form onSubmit={handleSubmitEnquiry} className="space-y-3.5">
              <input type="text" value={enquiryForm.studentName} onChange={(e) => setEnquiryForm({ ...enquiryForm, studentName: e.target.value })} placeholder="Student Full Name *" className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white" required />
              <select value={enquiryForm.targetClass} onChange={(e) => setEnquiryForm({ ...enquiryForm, targetClass: e.target.value })} className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs font-bold text-white"><option value="Class 10th">Class 10th</option><option value="Class 12th Science">Class 12th Science</option><option value="Class 12th Commerce">Class 12th Commerce</option></select>
              <input type="tel" value={enquiryForm.phone} onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })} placeholder="10-Digit Mobile Number *" className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white" required />
              <button type="submit" className="w-full text-slate-950 font-extrabold py-3 rounded-xl text-sm bg-amber-500 hover:bg-amber-400">Confirm Seat</button>
            </form>
          </div>
        </div>
      )}

      {/* Admin Batch Modal */}
      {showBatchModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border-2 border-amber-500 text-slate-950">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3"><h3 className="text-lg font-extrabold">{editingBatch ? 'Edit Batch' : 'Create New Batch'}</h3><button onClick={() => setShowBatchModal(false)} className="text-slate-400"><X className="w-5 h-5" /></button></div>
            <form onSubmit={handleSaveBatch} className="space-y-3">
              <div><label className="text-xs font-bold text-slate-600 block mb-1">Batch Title *</label><input type="text" value={batchForm.title} onChange={(e) => setBatchForm({ ...batchForm, title: e.target.value })} placeholder="Batch Title" className="w-full px-3.5 py-2 border rounded-xl text-sm" required /></div>
              <div className="grid grid-cols-2 gap-2"><select value={batchForm.targetClass} onChange={(e) => setBatchForm({ ...batchForm, targetClass: e.target.value })} className="px-3 py-2 border rounded-xl text-xs font-bold"><option value="Class 10th">Class 10th</option><option value="Class 12th Science">Class 12th Science</option><option value="Class 12th Commerce">Class 12th Commerce</option></select><input type="number" value={batchForm.price} onChange={(e) => setBatchForm({ ...batchForm, price: Number(e.target.value) })} placeholder="Fee (₹)" className="px-3 py-2 border rounded-xl text-sm" required /></div>
              <div className="flex justify-end gap-3 pt-2"><button type="button" onClick={() => setShowBatchModal(false)} className="px-4 py-2 text-xs font-bold text-slate-600">Cancel</button><button type="submit" className="px-5 py-2.5 bg-amber-500 text-slate-950 text-xs font-extrabold rounded-xl shadow-md">Save Changes</button></div>
            </form>
          </div>
        </div>
      )}

      {/* 🔒 ADMIN LOGIN MODAL */}
      {showAdminLoginModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-amber-500 text-white rounded-2xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-extrabold text-amber-400">Admin Login</h3>
              <button onClick={() => setShowAdminLoginModal(false)} className="text-slate-400 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              // Yahan aap apna Admin Password set kar sakte hain (Abhi ke liye "admin123" rakha hai)
              if (adminPasswordInput === 'admin123') {
                setIsAdminLoggedIn(true);
                setShowAdminLoginModal(false);
                setActiveView('admin');
                setAdminPasswordInput('');
                triggerToast('Admin Login Successful!');
              } else {
                alert('Galat Password hai! Kripya sahi password dalein.');
              }
            }} className="space-y-3.5">
              <p className="text-xs text-slate-300">Admin panel access karne ke liye password darj karein:</p>
              <input 
                type="password" 
                value={adminPasswordInput} 
                onChange={(e) => setAdminPasswordInput(e.target.value)} 
                placeholder="Admin Password (admin123)" 
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white outline-none focus:border-amber-400" 
                required 
              />
              <button type="submit" className="w-full text-slate-950 font-extrabold py-3 rounded-xl text-sm bg-amber-500 hover:bg-amber-400 transition">
                Login as Admin
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8 px-4 border-t border-slate-800 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2"><div className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-extrabold">T</div><span className="font-bold text-white">Takshashila Academy (Class 10th & 12th Coaching)</span></div>
          <p>© 2026-27 Takshashila Academy. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}