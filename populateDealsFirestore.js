// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc, getDocs, query, where, updateDoc, doc } = require("firebase/firestore");

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
    id: 'spotify-buy-2-get-3rd-free',
    name: 'Buy 2 Spotify Accounts → 3rd Free',
    description: 'Purchase 2 Spotify Premium accounts and get the 3rd one absolutely free (per single transaction)',
    type: 'single',
    serviceIds: ['1'], // Spotify Premium service ID
    originalPrice: 179.97, // 3 accounts at $59.99 each
    dealPrice: 82.00, // Price equals two Netflix accounts (41 * 2)
    savings: 97.97,
    discountPercentage: 54,
    promoCode: 'SPOTIFY3RD',
    validUntil: new Date('2025-12-31'),
    isActive: true,
    priority: 1,
    badge: '🎵 SPOTIFY SPECIAL',
    features: [
      'Get 3 Spotify Premium accounts',
      'Pay for only 2 accounts',
      'All accounts fully activated',
      'Perfect for families or friends',
      'Ad-free music streaming',
      'Offline downloads included'
    ],
    terms: [
      'Valid per single transaction only',
      'All 3 accounts must be purchased together',
      'Cannot be combined with other offers',
      'Accounts delivered within 24 hours'
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: 'spotify-family-pack-5-accounts',
    name: 'Spotify Family Pack — 5 Accounts for $150',
    description: 'Get 5 Spotify Premium accounts for just $150 - perfect for families and groups',
    type: 'single',
    serviceIds: ['1'], // Spotify Premium service ID
    originalPrice: 299.95, // 5 accounts at $59.99 each
    dealPrice: 150.00,
    savings: 149.95,
    discountPercentage: 50,
    promoCode: 'FAMILY150',
    validUntil: new Date('2025-12-31'),
    isActive: true,
    priority: 2,
    badge: '👨‍👩‍👧‍👦 FAMILY PACK',
    features: [
      '5 Spotify Premium accounts included',
      'Save $149.95 compared to individual purchases',
      'Perfect for families and friend groups',
      'All accounts fully activated',
      'Ad-free music for everyone',
      'Individual playlists and recommendations'
    ],
    terms: [
      'All 5 accounts must be purchased together',
      'Cannot be split into separate orders',
      'Accounts delivered within 24 hours',
      'Each account works independently'
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  },
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
  
];

async function uploadDeals() {
  try {
    console.log('🚀 Starting deals upload to Firestore...');
    
    // Upsert logic: update existing deals by id, add new ones otherwise
    const dealsCollection = collection(db, 'deals');
    let updatedCount = 0;
    let uploadedCount = 0;
    
    for (const deal of dealsData) {
      try {
        // Find existing doc by custom id field
        const q = query(dealsCollection, where('id', '==', deal.id));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          // Update the first matching document
          const existingDoc = snapshot.docs[0];
          await updateDoc(doc(db, 'deals', existingDoc.id), deal);
          console.log(`🔄 Updated existing deal: "${deal.name}" (doc ${existingDoc.id})`);
          updatedCount++;
        } else {
          const docRef = await addDoc(dealsCollection, deal);
          console.log(`✅ Deal "${deal.name}" uploaded with ID: ${docRef.id}`);
          uploadedCount++;
        }
      } catch (error) {
        console.error(`❌ Error uploading deal "${deal.name}":`, error);
      }
    }

    console.log('🎉 Deals upload completed!');
    console.log(`📊 New deals uploaded: ${uploadedCount}`);
    console.log(`🔄 Existing deals updated: ${updatedCount}`);
    
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
