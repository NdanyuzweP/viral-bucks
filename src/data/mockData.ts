import { Task, P2POrder } from '../types';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Follow Instagram Account',
    description: 'Follow our Instagram account and like the latest 3 posts',
    reward: 2.50,
    category: 'social',
    timeToComplete: 5,
    difficulty: 'easy',
    isCompleted: false,
    steps: [
      'Go to @vilarbucks_official on Instagram',
      'Click Follow',
      'Like the latest 3 posts',
      'Take a screenshot of your follow',
    ],
  },
  {
    id: '2',
    title: 'Complete Survey: Shopping Habits',
    description: 'Answer questions about your online shopping preferences',
    reward: 5.00,
    category: 'survey',
    timeToComplete: 10,
    difficulty: 'easy',
    isCompleted: false,
    steps: [
      'Click on the survey link',
      'Answer all questions honestly',
      'Submit the completed survey',
    ],
  },
  {
    id: '3',
    title: 'Download and Rate App',
    description: 'Download TaskMaster app and give it a 5-star rating',
    reward: 8.00,
    category: 'app',
    timeToComplete: 15,
    difficulty: 'medium',
    isCompleted: false,
    steps: [
      'Download TaskMaster from App Store/Google Play',
      'Open the app and create an account',
      'Rate the app 5 stars',
      'Leave a positive review',
    ],
  },
  {
    id: '4',
    title: 'Watch Product Demo Video',
    description: 'Watch a 5-minute video about our new product features',
    reward: 3.25,
    category: 'video',
    timeToComplete: 8,
    difficulty: 'easy',
    isCompleted: false,
    steps: [
      'Click the video link',
      'Watch the entire video',
      'Answer the quiz question at the end',
    ],
  },
  {
    id: '5',
    title: 'Refer 3 Friends',
    description: 'Invite 3 friends to join Vilarbucks and earn bonus rewards',
    reward: 15.00,
    category: 'referral',
    timeToComplete: 30,
    difficulty: 'hard',
    isCompleted: false,
    steps: [
      'Share your referral link with friends',
      'Ensure 3 friends sign up using your link',
      'Friends must complete at least 1 task each',
    ],
  },
];

export const mockP2POrders: P2POrder[] = [
  {
    id: '1',
    userId: '2',
    userName: 'CryptoTrader99',
    type: 'sell',
    amount: 1000,
    price: 1.002,
    currency: 'USD',
    paymentMethods: ['PayPal', 'Bank Transfer'],
    minAmount: 50,
    maxAmount: 500,
    isActive: true,
    createdAt: new Date('2024-01-20T10:30:00'),
  },
  {
    id: '2',
    userId: '3',
    userName: 'USDTBuyer',
    type: 'buy',
    amount: 800,
    price: 0.998,
    currency: 'USD',
    paymentMethods: ['PayPal', 'Zelle'],
    minAmount: 100,
    maxAmount: 800,
    isActive: true,
    createdAt: new Date('2024-01-20T11:15:00'),
  },
  {
    id: '3',
    userId: '4',
    userName: 'QuickSeller',
    type: 'sell',
    amount: 2000,
    price: 1.001,
    currency: 'USD',
    paymentMethods: ['Cash App', 'Venmo'],
    minAmount: 25,
    maxAmount: 1000,
    isActive: true,
    createdAt: new Date('2024-01-20T12:00:00'),
  },
  {
    id: '4',
    userId: '5',
    userName: 'TrustedTrader',
    type: 'buy',
    amount: 1500,
    price: 0.999,
    currency: 'USD',
    paymentMethods: ['Bank Transfer', 'PayPal'],
    minAmount: 200,
    maxAmount: 1500,
    isActive: true,
    createdAt: new Date('2024-01-20T13:45:00'),
  },
];