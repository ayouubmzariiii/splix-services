// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, getDocs } = require("firebase/firestore");

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDH7hWM41vqrffK9K86Mtntp87jD__fvYE",
  authDomain: "splix-e2410.firebaseapp.com",
  projectId: "splix-e2410",
  storageBucket: "splix-e2410.firebasestorage.app",
  messagingSenderId: "17711659255",
  appId: "1:17711659255:web:ce437815aff02105a33bf2",
  measurementId: "G-L3DZJVN2ST"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Sample deals data
const dealsData = [
  {
    id: 'netflix-spotify-combo',
    name: 'Ultimate Entertainment Combo',
    description: 'Netflix Premium + Spotify Premium bundle with exclusive discount',
    type: 'combo',
    serviceIds: ['1', '2'], // Spotify and Netflix service IDs
    originalPrice: 239.88,
    dealPrice: 179.88,
    savings: 60.00,
    discountPercentage: 25,
    promoCode: 'HOTDEAL25',
    validUntil: new Date('2025-12-31'),
    isActive: true,
    priority: 1,
    badge: '🔥 HOT DEAL',
    features: [
      'Netflix 4K Ultra HD streaming',
      'Spotify Premium ad-free music',
      '25% savings on annual subscription',
      'No commitment required'
    ],
    terms: [
      'Valid for new customers only',
      'Annual subscription required',
      'Cannot be combined with other offers',
      'Auto-renewal applies'
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'adobe-creative-deal',
    name: 'Creative Professional Bundle',
    description: 'Adobe Creative Cloud with exclusive 50% discount for professionals',
    type: 'single',
    serviceIds: ['3'], // Adobe Creative Cloud service ID
    originalPrice: 599.88,
    dealPrice: 299.99,
    savings: 299.89,
    discountPercentage: 50,
    promoCode: 'CREATIVE50',
    validUntil: new Date('2025-06-30'),
    isActive: true,
    priority: 2,
    badge: '💎 PREMIUM DEAL',
    features: [
      'All Adobe Creative Cloud apps',
      '100GB cloud storage included',
      'Premium fonts and assets',
      'Portfolio website builder'
    ],
    terms: [
      'Valid for students and professionals',
      'Annual subscription required',
      'Proof of eligibility may be required',
      'Limited time offer'
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'streaming-bundle',
    name: 'Complete Streaming Package',
    description: 'Netflix + YouTube Premium + Amazon Prime bundle deal',
    type: 'combo',
    serviceIds: ['2', '4', '8'], // Netflix, YouTube Premium, Amazon Prime
    originalPrice: 329.86,
    dealPrice: 249.99,
    savings: 79.87,
    discountPercentage: 24,
    promoCode: 'STREAM24',
    validUntil: new Date('2025-09-30'),
    isActive: true,
    priority: 3,
    badge: '📺 STREAMING DEAL',
    features: [
      'Netflix 4K streaming',
      'YouTube Premium ad-free',
      'Amazon Prime benefits',
      'Free shipping included'
    ],
    terms: [
      'All services must be activated together',
      'Annual billing required',
      'Geographic restrictions may apply',
      'Subject to individual service terms'
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'productivity-suite',
    name: 'Productivity Master Bundle',
    description: 'Microsoft Office 365 + Grammarly Premium + Dropbox Plus',
    type: 'combo',
    serviceIds: ['5', '9', '10'], // Office 365, Grammarly, Dropbox
    originalPrice: 419.86,
    dealPrice: 299.99,
    savings: 119.87,
    discountPercentage: 29,
    promoCode: 'PRODUCTIVE29',
    validUntil: new Date('2025-08-31'),
    isActive: true,
    priority: 4,
    badge: '💼 BUSINESS DEAL',
    features: [
      'Full Microsoft Office suite',
      'Advanced grammar checking',
      '2TB secure cloud storage',
      'Professional collaboration tools'
    ],
    terms: [
      'Business and personal use allowed',
      'Annual subscription required',
      'All apps must be activated within 30 days',
      'Support included for all services'
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'student-special',
    name: 'Student Essentials Pack',
    description: 'Special bundle for students with educational discounts',
    type: 'combo',
    serviceIds: ['1', '3', '9'], // Spotify, Adobe, Grammarly
    originalPrice: 449.86,
    dealPrice: 199.99,
    savings: 249.87,
    discountPercentage: 56,
    promoCode: 'STUDENT56',
    validUntil: new Date('2025-12-31'),
    isActive: true,
    priority: 5,
    badge: '🎓 STUDENT DEAL',
    features: [
      'Spotify Premium for students',
      'Adobe Creative Cloud education',
      'Grammarly Premium writing assistant',
      'Exclusive student pricing'
    ],
    terms: [
      'Valid student ID required',
      'Annual verification needed',
      'Educational use only',
      'Cannot be transferred'
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function uploadDeals() {
  try {
    console.log('🚀 Starting deals upload to Firestore...');
    
    // Check if deals collection already has data
    const dealsCollection = collection(db, 'deals');
    const existingDeals = await getDocs(dealsCollection);
    
    if (!existingDeals.empty) {
      console.log('⚠️  Deals collection already contains data. Skipping upload to avoid duplicates.');
      console.log(`Found ${existingDeals.size} existing deals.`);
      return;
    }

    // Upload each deal
    for (const deal of dealsData) {
      try {
        const docRef = await addDoc(dealsCollection, deal);
        console.log(`✅ Deal "${deal.name}" uploaded with ID: ${docRef.id}`);
      } catch (error) {
        console.error(`❌ Error uploading deal "${deal.name}":`, error);
      }
    }

    console.log('🎉 All deals uploaded successfully!');
    console.log(`📊 Total deals uploaded: ${dealsData.length}`);
    
  } catch (error) {
    console.error('💥 Error during deals upload:', error);
    
    if (error.code === 'permission-denied') {
      console.log('\n🔒 PERMISSION DENIED ERROR');
      console.log('This error occurs because Firestore security rules are blocking writes.');
      console.log('\n📋 To fix this, you have two options:');
      console.log('1. 🔧 Update Firestore Security Rules (Temporary):');
      console.log('   Go to Firebase Console > Firestore Database > Rules');
      console.log('   Replace the rules with:');
      console.log('   rules_version = "2";');
      console.log('   service cloud.firestore {');
      console.log('     match /databases/{database}/documents {');
      console.log('       match /{document=**} {');
      console.log('         allow read, write: if true;');
      console.log('       }');
      console.log('     }');
      console.log('   }');
      console.log('\n2. 📝 Manual Entry via Firebase Console:');
      console.log('   Go to Firebase Console > Firestore Database');
      console.log('   Create a "deals" collection and add the deals manually');
      console.log('\n⚠️  Remember to revert security rules after uploading!');
    }
  }
}

// Run the upload
uploadDeals();